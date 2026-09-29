import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
    limit,
    orderBy,
    query,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const profileLink = document.getElementById('profile-nav-link');
const productModal = document.getElementById('product-modal');
const productStatus = document.getElementById('product-status');
const orderForm = document.getElementById('order-form');
const ownerWhatsApp = '919889501444';
let currentUser = null;
let authStateReady = false;
let activeProduct = null;
let productQuantity = 1;
let processedReturnAction = false;

function setStatus(element, message, isError = false) {
    element.textContent = message;
    element.dataset.error = String(isError);
}

function updateProfileLink() {
    const icon = document.getElementById('profile-icon');
    icon.textContent = 'P';
    if (!currentUser) {
        profileLink.title = 'Login';
        profileLink.setAttribute('aria-label', 'Login to your profile');
        return;
    }

    const displayName = currentUser.displayName || 'Profile';
    profileLink.title = displayName;
    profileLink.setAttribute('aria-label', `Open ${displayName}'s profile`);
}

function cartStorageKey(user) {
    return `henivet_cart_${user.uid}`;
}

function readCart(user) {
    try {
        const cart = JSON.parse(sessionStorage.getItem(cartStorageKey(user)) || '[]');
        return Array.isArray(cart) ? cart : [];
    } catch {
        return [];
    }
}

function saveCart(user, cart) {
    sessionStorage.setItem(cartStorageKey(user), JSON.stringify(cart));
}

function addCartItem(user, productName, quantity) {
    const cart = readCart(user);
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) existingItem.quantity = Math.min(99, existingItem.quantity + quantity);
    else cart.push({ name: productName, quantity });
    saveCart(user, cart);
}

function openProductDetails(card) {
    activeProduct = {
        name: card.querySelector('h3').textContent.trim(),
        image: card.querySelector('img').getAttribute('src'),
        imageAlt: card.querySelector('img').getAttribute('alt'),
        description: card.querySelector('.medicine-card-body p').textContent.trim()
    };
    productQuantity = 1;
    document.getElementById('product-title').textContent = activeProduct.name;
    const image = document.getElementById('product-image');
    image.src = activeProduct.image;
    image.alt = activeProduct.imageAlt;
    document.getElementById('product-description').textContent = activeProduct.description;
    document.getElementById('product-quantity').textContent = String(productQuantity);
    setStatus(productStatus, '');
    productModal.hidden = false;
}

function redirectToLogin(action, productName) {
    const parameters = new URLSearchParams({ action });
    if (productName) parameters.set('product', productName);
    window.location.href = `user_login/index.html?${parameters}`;
}

function saveOrderDraft() {
    const draft = {
        name: document.getElementById('name').value.trim(),
        medicine: document.getElementById('medicine').value,
        animal: document.getElementById('animal').value,
        problem: document.getElementById('problem').value.trim()
    };
    sessionStorage.setItem('henivet_pending_order', JSON.stringify(draft));
}

function resumeLoginAction(user) {
    if (processedReturnAction) return;
    const action = new URLSearchParams(window.location.search).get('action');
    if (action !== 'review' && action !== 'order') return;
    processedReturnAction = true;

    if (action === 'review') {
        document.getElementById('review-name').value = user.displayName || '';
        window.history.replaceState({}, '', `${window.location.pathname}#reviews`);
        document.getElementById('reviews').scrollIntoView();
        document.getElementById('review-toggle').click();
        return;
    }

    try {
        const draft = JSON.parse(sessionStorage.getItem('henivet_pending_order') || 'null');
        if (draft && typeof draft === 'object') {
            document.getElementById('name').value = draft.name || '';
            document.getElementById('medicine').value = draft.medicine || '';
            document.getElementById('animal').value = draft.animal || '';
            document.getElementById('problem').value = draft.problem || '';
        }
        sessionStorage.removeItem('henivet_pending_order');
    } catch (error) {
        console.error('Pending order could not be restored', error);
    }
    window.history.replaceState({}, '', `${window.location.pathname}#contact`);
    document.getElementById('contact').scrollIntoView();
}

function addActiveProductToCart() {
    if (!activeProduct) return;
    if (!authStateReady) {
        setStatus(productStatus, 'Checking your login status. Please try again.', true);
        return;
    }
    if (!currentUser) {
        redirectToLogin('add', activeProduct.name);
        return;
    }

    addCartItem(currentUser, activeProduct.name, productQuantity);
    window.location.href = 'user_login/index.html#cart';
}

function buildWhatsAppUrl(items) {
    const lines = items.map((item, index) => `${index + 1}. ${item.name} - Quantity: ${item.quantity}`);
    const message = `Hello Henivet Pharma, I would like to order:\n${lines.join('\n')}`;
    return `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(message)}`;
}

function buildOrderWhatsAppUrl(order) {
    const message = [
        'Hello Henivet Pharma, I would like to place an order:',
        `Name: ${order.name}`,
        `Phone: ${order.phoneNumber}`,
        `Medicine: ${order.medicine}`,
        `Animal: ${order.animal}`,
        `Problem: ${order.problem}`
    ].join('\n');
    return `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(message)}`;
}

function orderActiveProduct() {
    if (!activeProduct) return;
    if (!authStateReady) {
        setStatus(productStatus, 'Checking your login status. Please try again.', true);
        return;
    }
    if (!currentUser) {
        redirectToLogin('direct', activeProduct.name);
        return;
    }
    window.open(buildWhatsAppUrl([{ name: activeProduct.name, quantity: productQuantity }]), '_blank', 'noopener,noreferrer');
}

onAuthStateChanged(auth, user => {
    currentUser = user;
    authStateReady = true;
    updateProfileLink();

    const parameters = new URLSearchParams(window.location.search);
    if (user) resumeLoginAction(user);
    if (user && parameters.has('product') && parameters.get('action') !== 'add') {
        const productName = parameters.get('product');
        const card = [...document.querySelectorAll('.medicine-card')].find(item =>
            item.querySelector('h3')?.textContent.trim() === productName
        );
        if (card) openProductDetails(card);
    }
});

document.addEventListener('languagechange', updateProfileLink);

document.addEventListener('click', event => {
    const card = event.target.closest('.medicine-card');
    if (card) openProductDetails(card);
});

document.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('.medicine-card')) {
        event.preventDefault();
        openProductDetails(event.target);
    }
});

document.getElementById('quantity-decrease').addEventListener('click', () => {
    productQuantity = Math.max(1, productQuantity - 1);
    document.getElementById('product-quantity').textContent = String(productQuantity);
});

document.getElementById('quantity-increase').addEventListener('click', () => {
    productQuantity = Math.min(99, productQuantity + 1);
    document.getElementById('product-quantity').textContent = String(productQuantity);
});

document.getElementById('add-to-cart').addEventListener('click', addActiveProductToCart);
document.getElementById('direct-order').addEventListener('click', orderActiveProduct);

document.querySelectorAll('[data-close-product]').forEach(button => {
    button.addEventListener('click', () => { productModal.hidden = true; });
});
productModal.addEventListener('click', event => {
    if (event.target === productModal) productModal.hidden = true;
});

orderForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!authStateReady || !currentUser) {
        saveOrderDraft();
        window.location.href = 'user_login/index.html?action=order';
        return;
    }

    const submitButton = orderForm.querySelector('[type="submit"]');
    const orderStatus = document.getElementById('order-status');
    const order = {
        uid: currentUser.uid,
        name: document.getElementById('name').value.trim(),
        phoneNumber: currentUser.phoneNumber,
        medicine: document.getElementById('medicine').value,
        animal: document.getElementById('animal').value,
        problem: document.getElementById('problem').value.trim()
    };
    window.open(buildOrderWhatsAppUrl(order), '_blank', 'noopener,noreferrer');
    submitButton.disabled = true;
    setStatus(orderStatus, 'WhatsApp opened. Review your order and tap Send to message us.');
    try {
        await addDoc(collection(database, 'orders'), {
            ...order,
            createdAt: serverTimestamp()
        });
        orderForm.reset();
        setStatus(orderStatus, 'Order details are ready in WhatsApp. Tap Send to contact Henivet Pharma.');
    } catch (error) {
        setStatus(orderStatus, 'WhatsApp opened, but the order could not be saved on the website. Tap Send to contact us.', true);
        console.error('Firebase order save failed', error);
    } finally {
        submitButton.disabled = false;
    }
});

Promise.all(['Reviews', 'reviews'].map(name =>
    getDocs(query(collection(database, name), orderBy('createdAt', 'desc'), limit(20)))
))
    .then(snapshots => {
        const reviewsGrid = document.querySelector('.reviews-grid');
        const reviews = snapshots.flatMap(snapshot => snapshot.docs);
        reviews.sort((first, second) =>
            (second.data().createdAt?.toMillis?.() || 0) - (first.data().createdAt?.toMillis?.() || 0)
        );
        reviews.slice(0, 20).forEach(reviewDocument => addCustomerReview(reviewDocument.data(), reviewsGrid));
    })
    .catch(error => console.error('Firebase reviews could not be loaded', error));

document.getElementById('review-toggle').addEventListener('click', event => {
    if (!authStateReady || !currentUser) {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.location.href = 'user_login/index.html?action=review';
    }
}, true);

document.getElementById('review-form').addEventListener('submit', event => {
    if (!authStateReady || !currentUser) {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.location.href = 'user_login/index.html?action=review';
    }
}, true);

document.addEventListener('henivet:review-submit', async event => {
    if (!currentUser) return;
    const reviewForm = document.getElementById('review-form');
    const submitButton = reviewForm.querySelector('[type="submit"]');
    submitButton.disabled = true;
    try {
        await addDoc(collection(database, 'Reviews'), {
            uid: currentUser.uid,
            name: event.detail.name,
            rating: event.detail.rating,
            message: event.detail.message,
            createdAt: serverTimestamp()
        });
        addCustomerReview(event.detail, document.querySelector('.reviews-grid'));
        reviewForm.reset();
        reviewForm.hidden = true;
        document.getElementById('review-toggle').setAttribute('aria-expanded', 'false');
    } catch (error) {
        window.alert('Your review could not be saved. Please try again.');
        console.error('Firebase review save failed', error);
    } finally {
        submitButton.disabled = false;
    }
});

updateProfileLink();