// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyC5vHR2t2KUqmoktMi3vMRLPyCL7_oABto",
  authDomain: "expense-tracker-9eb29.firebaseapp.com",
  projectId: "expense-tracker-9eb29",
  storageBucket: "expense-tracker-9eb29.firebasestorage.app",
  messagingSenderId: "601389826503",
  appId: "1:601389826503:web:02143309c6941ceb3dd9e2",
  measurementId: "G-ZVGEZTPM21",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification?.title || "Background Notification";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new message.",
    icon: payload.notification?.image || '/firebase-logo.png', // optional, change this to your app icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
