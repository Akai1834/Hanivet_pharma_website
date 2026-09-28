# Henivet Pharma

A static website for Henivet Pharma's livestock medicine catalogue. It includes English/Hindi content, medicine details, Firebase phone OTP sign-in, a customer profile and cart, and WhatsApp order links.

## Features

- Browse medicine photos and descriptions; open a product detail dialog and adjust quantity.
- Add medicines to the signed-in user's cart or start a WhatsApp order with the selected products and quantities.
- Sign in or create a profile with a name and Indian mobile number using Firebase Phone Authentication and reCAPTCHA.
- Save a user's display name, verified phone number, and login timestamp to Firestore at `users/{uid}`.
- Access the profile and cart separately at `user_login/index.html`; the main navigation links to this page.
- Switch the website language between English and Hindi.

The cart is scoped to the Firebase UID and stored in the current browser tab's `sessionStorage`; it is not a Firestore order or a permanent cart. A WhatsApp order opens a prefilled message for the business to confirm.

## Project Structure

- `index.html`, `style.css`, `script.js`: main website and product catalogue.
- `site-auth.js`: main-page Firebase auth state, protected order/review actions, and product details.
- `user_login/index.html`: separate login, profile, and cart page.
- `user_login/account.js`, `user_login/account.css`: account login/profile/cart behavior and styling.
- `firebase-config.js`: Firebase Web app configuration used by the client.
- `firestore.rules`: Firestore access rules.
- `FIREBASE_SETUP.md`: Firebase setup, domain authorization, and search indexing notes.
- `robots.txt`, `sitemap.xml`: crawler configuration for `henivetpharma.com`.

## Run Locally

Serve the folder over HTTP so browser ES modules and Firebase work. From the project root, run:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000>. Use `http://localhost:8000/user_login/index.html` to open the account page directly. Do not use `file://` URLs for Firebase authentication.

## Firebase Setup

1. In Firebase Console, enable **Phone** under Authentication sign-in providers.
2. Add `localhost` and the deployed website host to Authentication's authorized domains. Phone sign-in uses Firebase reCAPTCHA.
3. Create a Cloud Firestore database.
4. Publish `firestore.rules` from Firestore's **Rules** tab. The rules restrict profiles and orders to their owner and validate server-generated timestamps.
5. Confirm the Firebase Web app configuration in `firebase-config.js` belongs to the intended Firebase project.

The Web API key in `firebase-config.js` identifies the client app; it is not a service-account credential. Never place Firebase Admin service-account JSON files, private keys, access tokens, or passwords in this static website. The `.gitignore` excludes common secret and local-generated files.

Firebase SMS availability and pricing depend on project settings and destination country. Test phone sign-in using Firebase's supported test-phone-number option before relying on production SMS.

## Deploy

The website can be hosted as static files on GitHub Pages or another HTTPS static host. For GitHub Pages:

1. Push the project files to a GitHub repository.
2. In repository **Settings → Pages**, choose deployment from the intended branch and the repository root.
3. Add the published host (for example, `<username>.github.io`) to Firebase Authentication's authorized domains.
4. Publish the Firestore rules separately in Firebase Console; putting `firestore.rules` in GitHub does not deploy them to Firebase.
5. Update the canonical URL, Open Graph URL, `robots.txt`, and `sitemap.xml` if the deployed domain is not `henivetpharma.com`.

Search indexing is not immediate or guaranteed. Verify a production domain in Google Search Console and submit its sitemap.
