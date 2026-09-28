import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import {
    getAuth,
    onAuthStateChanged,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    signOut,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import {
    doc,
    getFirestore,
    serverTimestamp,
    setDoc
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
import { firebaseConfig } from '../firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const loginView = document.getElementById('login-view');
const profileView = document.getElementById('profile-view');
const phoneForm = document.getElementById('phone-form');
const otpForm = document.getElementById('otp-form');
const loginStatus = document.getElementById('login-status');
const cartStatus = document.getElementById('cart-status');
const ownerWhatsApp = '919889501444';
let confirmationResult = null;
let recaptchaVerifier = null;
let authReady = false;
let processedDestination = false;
let isSigningIn = false;
let currentUser = null;

function showStatus(element, message, isError = false) {
    element.textContent = message;
    element.dataset.error = String(isError);
}

function storageKey(user) {
    return `henivet_cart_${user.uid}`;
}

function readCart(user) {
    try {
        const cart = JSON.parse(sessionStorage.getItem(storageKey(user)) || '[]');
        return Array.isArray(cart) ? cart.filter(item =>
            item && typeof item.name === 'string' && Number.isInteger(item.quantity) && item.quantity > 0
        ) : [];
    } catch {
        return [];
    }
}

function saveCart(user, cart) {
    sessionStorage.setItem(storageKey(user), JSON.stringify(cart));
}

function renderCart(user) {
    const cart = readCart(user);
    const cartItems = document.getElementById('cart-items');
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = `${itemCount} item${itemCount === 1 ? '' : 's'}`;
    document.getElementById('cart-empty').hidden = cart.length > 0;
    document.getElementById('cart-order').disabled = cart.length === 0;
    cartItems.replaceChildren();

    cart.forEach(item => {
        const row = document.createElement('article');
        row.className = 'cart-item';
        const name = document.createElement('h3');
        name.textContent = item.name;
        const quantity = document.createElement('p');
        quantity.textContent = `Quantity: ${item.quantity}`;
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'remove-button';
        remove.textContent = 'Remove';
        remove.addEventListener('click', () => {
            saveCart(user, readCart(user).filter(cartItem => cartItem.name !== item.name));
            renderCart(user);
        });
        row.append(name, quantity, remove);
        cartItems.append(row);
    });
}

function addRequestedProduct(user) {
    const parameters = new URLSearchParams(window.location.search);
    const productName = parameters.get('product');
    if (!productName || parameters.get('action') !== 'add') return false;

    const cart = readCart(user);
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) existingItem.quantity = Math.min(99, existingItem.quantity + 1);
    else cart.push({ name: productName, quantity: 1 });
    saveCart(user, cart);
    window.history.replaceState({}, '', `${window.location.pathname}#cart`);
    return true;
}

function processDestination(user, newlySignedIn = false) {
    if (processedDestination) return;
    processedDestination = true;
    const parameters = new URLSearchParams(window.location.search);
    const productName = parameters.get('product');
    if (addRequestedProduct(user)) {
        renderCart(user);
        window.location.hash = 'cart';
        return;
    }
    if (productName) {
        window.location.replace(`../index.html?product=${encodeURIComponent(productName)}&action=direct`);
        return;
    }
    if (newlySignedIn) {
        window.location.replace('../index.html');
        return;
    }
    renderCart(user);
}

async function completeSignIn(user, displayName) {
    if (displayName && user.displayName !== displayName) {
        await updateProfile(user, { displayName });
        user = auth.currentUser;
    }
    await setDoc(doc(database, 'users', user.uid), {
        displayName: displayName || user.displayName || 'Henivet Customer',
        phoneNumber: user.phoneNumber,
        loginTime: serverTimestamp()
    }, { merge: true });
    currentUser = user;
    showProfile(user);
    processDestination(user, true);
    isSigningIn = false;
}

function showProfile(user) {
    currentUser = user;
    loginView.hidden = true;
    profileView.hidden = false;
    const displayName = user.displayName || 'Henivet Customer';
    document.getElementById('profile-avatar').textContent = displayName.trim().charAt(0).toUpperCase();
    document.getElementById('profile-name').textContent = `Hello, ${displayName}`;
    document.getElementById('profile-phone').textContent = user.phoneNumber || '';
    renderCart(user);
}

function prepareRecaptcha() {
    if (recaptchaVerifier) return;
    recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'normal' });
    recaptchaVerifier.render().catch(error => {
        recaptchaVerifier = null;
        showStatus(loginStatus, error.message || 'Could not load reCAPTCHA. Check Firebase authorized domains.', true);
    });
}

onAuthStateChanged(auth, user => {
    authReady = true;
    currentUser = user;
    if (isSigningIn) return;
    if (user) {
        showProfile(user);
        processDestination(user);
    } else {
        loginView.hidden = false;
        profileView.hidden = true;
    }
});

phoneForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!authReady) {
        showStatus(loginStatus, 'Checking your account. Please try again.', true);
        return;
    }
    const name = document.getElementById('customer-name').value.trim();
    const phoneDigits = document.getElementById('phone-number').value.trim();
    if (!name || !/^\d{10}$/.test(phoneDigits)) {
        showStatus(loginStatus, 'Enter your name and a valid 10-digit mobile number.', true);
        return;
    }

    try {
        prepareRecaptcha();
        if (!recaptchaVerifier) throw new Error('Could not prepare reCAPTCHA. Please reload the page.');
        confirmationResult = await signInWithPhoneNumber(auth, `+91${phoneDigits}`, recaptchaVerifier);
        phoneForm.hidden = true;
        otpForm.hidden = false;
        otpForm.dataset.displayName = name;
        document.getElementById('otp-code').focus();
        showStatus(loginStatus, `OTP sent to +91 ${phoneDigits}.`);
    } catch (error) {
        showStatus(loginStatus, error.message || 'Could not send OTP. Please try again.', true);
    }
});

otpForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!confirmationResult) return;
    const code = document.getElementById('otp-code').value.trim();
    if (!/^\d{6}$/.test(code)) {
        showStatus(loginStatus, 'Enter the 6-digit code from your SMS.', true);
        return;
    }

    isSigningIn = true;
    try {
        const credential = await confirmationResult.confirm(code);
        await completeSignIn(credential.user, otpForm.dataset.displayName);
    } catch (error) {
        isSigningIn = false;
        showStatus(loginStatus, error.message || 'OTP verification or profile save failed.', true);
    }
});

document.getElementById('change-number').addEventListener('click', () => {
    confirmationResult = null;
    otpForm.reset();
    otpForm.hidden = true;
    phoneForm.hidden = false;
    showStatus(loginStatus, '');
});

document.getElementById('logout-button').addEventListener('click', async () => {
    await signOut(auth);
    processedDestination = false;
    window.history.replaceState({}, '', window.location.pathname);
    loginView.hidden = false;
    profileView.hidden = true;
});

document.getElementById('cart-order').addEventListener('click', () => {
    if (!currentUser) return;
    const cart = readCart(currentUser);
    if (cart.length === 0) return;
    const orderLines = cart.map((item, index) => `${index + 1}. ${item.name} - Quantity: ${item.quantity}`);
    const message = `Hello Henivet Pharma, I would like to order:\n${orderLines.join('\n')}`;
    window.open(`https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

void prepareRecaptcha();