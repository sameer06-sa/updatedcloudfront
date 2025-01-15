// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ8DgP9Ep21_YpBJZT2FJYnwzsZSj47SU",
  authDomain: "otp-generator-ed2f7.firebaseapp.com",
  projectId: "otp-generator-ed2f7",
  storageBucket: "otp-generator-ed2f7.firebasestorage.app",
  messagingSenderId: "536679181037",
  appId: "1:536679181037:web:911ff6131540d536813ae4",
  measurementId: "G-77SYVKDCVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);