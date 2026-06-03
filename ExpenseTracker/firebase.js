import firebase from "firebase/compat/app";

import "firebase/compat/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAf066un22ln3kP7zrFY8YXZUW25suDjps",
  authDomain: "blood-donation-system-115d2.firebaseapp.com",
  projectId: "blood-donation-system-115d2",
  storageBucket: "blood-donation-system-115d2.firebasestorage.app",
  messagingSenderId: "448934792999",
  appId: "1:448934792999:web:de1f88e39c36259af52302",
};


// Initialize Firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Firestore and Auth
const db = firebase.firestore();
const auth = firebase.auth(); // ✅ Add this line

export { firebase, db, auth }; // ✅ Export auth too
