import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHRNuu4BDIwTEd4rtEPXJXvA7fyorwHFU",
  authDomain: "friends-community-c4087.firebaseapp.com",
  projectId: "friends-community-c4087",
  storageBucket: "friends-community-c4087.firebasestorage.app",
  messagingSenderId: "815934807083",
  appId: "1:815934807083:web:70e2432303cabdcd955e6e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
