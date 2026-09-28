# Firebase setup

The website uses Firebase Authentication for phone-number OTP login and Cloud Firestore for user profiles, order requests, and submitted reviews. It does not save account or order data in browser local storage.

1. In the `henivet-pharma` Firebase project, enable Phone sign-in under Authentication > Sign-in method. Add the production domain and `localhost` to authorized domains. Phone sign-in requires Firebase reCAPTCHA verification.
2. Create a Cloud Firestore database, then publish the current contents of `firestore.rules` in Firestore > Rules. The rules require `loginTime` to be a server timestamp.
3. `firebase-config.js` already contains the Web app configuration supplied for this project.
4. Serve the website over HTTPS (or localhost while testing). Open `user_login/index.html`, enter a name and phone number, then verify the SMS OTP. A successful login saves `displayName`, `phoneNumber`, and `loginTime` at `users/{uid}` before returning to `index.html`.
5. Verify the domain in Google Search Console and submit `https://henivetpharma.com/sitemap.xml`.

The Firebase Web API key is a public client identifier, not a server secret. Keep Firestore rules published and never replace them with open read/write rules. The rules let users read only their own profile and orders; reviews are public to read, while only signed-in users can create them. The profile's cart is scoped by Firebase UID and kept in session storage for the current browser tab; it is not stored with account data in Firestore.

Cloud Firestore has a no-cost quota, but quotas and pricing can change. Phone authentication SMS may incur charges or be limited by country, provider, and Firebase billing settings, so confirm the current Firebase pricing before enabling production SMS. A search engine may take time to index a live site; metadata and a sitemap do not guarantee ranking or immediate appearance.