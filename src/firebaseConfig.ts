// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5omz1QqzBFEHJfBm7qKRJDmbzcuL6dEA",
  authDomain: "isladent-cozumel.firebaseapp.com",
  databaseURL: "https://isladent-cozumel-default-rtdb.firebaseio.com",
  projectId: "isladent-cozumel",
  storageBucket: "isladent-cozumel.firebasestorage.app",
  messagingSenderId: "453037507910",
  appId: "1:453037507910:web:7e7f04ba504e223c41d147"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);