// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5vHR2t2KUqmoktMi3vMRLPyCL7_oABto",
  authDomain: "expense-tracker-9eb29.firebaseapp.com",
  projectId: "expense-tracker-9eb29",
  storageBucket: "expense-tracker-9eb29.firebasestorage.app",
  messagingSenderId: "601389826503",
  appId: "1:601389826503:web:02143309c6941ceb3dd9e2",
  measurementId: "G-ZVGEZTPM21",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission, "permission");
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BHUdMrPxKvcKbPdkzUi_rENVC6F_bivUWNjjBEAGemFFLfI_NUK-BYV1f3LS49L9iTc8SAlTGOQtd8EIxz2fLHU",
    });
    localStorage.setItem('deviceToken', token)
    console.log(token, "token");
  }
};
