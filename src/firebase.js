// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// import 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLAgZdGf7UyWa1BhSYUaffntunQlRnd5M",
    authDomain: "authnetflix-f0e82.firebaseapp.com",
    projectId: "authnetflix-f0e82",
    storageBucket: "authnetflix-f0e82.appspot.com",
    messagingSenderId: "507639556561",
    appId: "1:507639556561:web:9e5de3381ca394ff0358f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.setPersistence(browserLocalPersistence);
const db = getFirestore(app);

export { app, auth, db };