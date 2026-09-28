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

function redirectToLogin(action) {
    const parameters = new URLSearchParams({
        product: activeProduct.name,
        action
    });
    window.location.href = `user_login/index.html?${parameters}`;
}

function addActiveProductToCart() {
    if (!activeProduct) return;
    if (!authStateReady) {
        setStatus(productStatus, 'Checking your login status. Please try again.', true);
        return;
    }
    if (!currentUser) {
        redirectToLogin('add');
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

function orderActiveProduct() {
    if (!activeProduct) return;
    if (!authStateReady) {
        setStatus(productStatus, 'Checking your login status. Please try again.', true);
        return;
    }
    if (!currentUser) {
        redirectToLogin('direct');
        return;
    }
    window.open(buildWhatsAppUrl([{ name: activeProduct.name, quantity: productQuantity }]), '_blank', 'noopener,noreferrer');
}

onAuthStateChanged(auth, user => {
    currentUser = user;
    authStateReady = true;
    updateProfileLink();

    const parameters = new URLSearchParams(window.location.search);
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
        window.location.href = 'user_login/index.html';
        return;
    }

    const submitButton = orderForm.querySelector('[type="submit"]');
    submitButton.disabled = true;
    try {
        await addDoc(collection(database, 'orders'), {
            uid: currentUser.uid,
            name: document.getElementById('name').value.trim(),
            phoneNumber: currentUser.phoneNumber,
            medicine: document.getElementById('medicine').value,
            animal: document.getElementById('animal').value,
            problem: document.getElementById('problem').value.trim(),
            createdAt: serverTimestamp()
        });
        orderForm.reset();
        window.alert('Order request saved. Henivet Pharma will contact you.');
    } catch (error) {
        window.alert('Order could not be saved. Please try again.');
        console.error('Firebase order save failed', error);
    } finally {
        submitButton.disabled = false;
    }
});

getDocs(query(collection(database, 'reviews'), orderBy('createdAt', 'desc'), limit(20)))
    .then(snapshot => {
        const reviewsGrid = document.querySelector('.reviews-grid');
        snapshot.forEach(reviewDocument => addCustomerReview(reviewDocument.data(), reviewsGrid));
    })
    .catch(error => console.error('Firebase reviews could not be loaded', error));

document.getElementById('review-toggle').addEventListener('click', event => {
    if (!authStateReady || !currentUser) {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.location.href = 'user_login/index.html';
    }
}, true);

document.getElementById('review-form').addEventListener('submit', event => {
    if (!authStateReady || !currentUser) {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.location.href = 'user_login/index.html';
    }
}, true);

document.addEventListener('henivet:review-submit', async event => {
    if (!currentUser) return;
    try {
        await addDoc(collection(database, 'reviews'), {
            uid: currentUser.uid,
            name: event.detail.name,
            rating: event.detail.rating,
            message: event.detail.message,
            createdAt: serverTimestamp()
        });
        addCustomerReview(event.detail, document.querySelector('.reviews-grid'));
    } catch (error) {
        window.alert('Your review could not be saved. Please try again.');
        console.error('Firebase review save failed', error);
    }
});

updateProfileLink();