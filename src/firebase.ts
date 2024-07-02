// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvp5-60I4Dfzwi0-0vP6XzOCWc2c1syhU",
  authDomain: "nwitter-7ecff.firebaseapp.com",
  projectId: "nwitter-7ecff",
  storageBucket: "nwitter-7ecff.appspot.com",
  messagingSenderId: "917101860126",
  appId: "1:917101860126:web:001b555776a33be345650f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// firesbase 로그인 인증 방법
export { auth, onAuthStateChanged };
