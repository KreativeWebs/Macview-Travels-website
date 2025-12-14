import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGc_lHYl8Z3mSpDrPkLC_pEe8sbGy3aOg",
  authDomain: "macviewtravel.com",
  projectId: "macviewtravels-2020",
  storageBucket: "macviewtravels-2020.firebasestorage.app",
  messagingSenderId: "865149352401",
  appId: "1:865149352401:web:88284acbd15eb0708c88f0",
  measurementId: "G-JB57369BBX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Force account selection every time
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, googleProvider };