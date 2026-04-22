import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYVyDKUjxtTgqam98qT9c_CRdFfTyZV8k",
  authDomain: "netflix-gpt-saugata.firebaseapp.com",
  projectId: "netflix-gpt-saugata",
  storageBucket: "netflix-gpt-saugata.firebasestorage.app",
  messagingSenderId: "773096499694",
  appId: "1:773096499694:web:1bf4ec0e82a93f711cc6ff",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);