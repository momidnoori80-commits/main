// firebase.js


// Firebase App
import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";


// Firebase Authentication
import { 
    getAuth 
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";


// Firestore Database
import { 
    getFirestore 
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


// Firebase Storage
import { 
    getStorage 
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";


// Analytics
import { 
    getAnalytics 
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";




// Your Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyBHRNuu4BDIwTEd4rtEPXJXvA7fyorwHFU",

    authDomain: "friends-community-c4087.firebaseapp.com",

    projectId: "friends-community-c4087",

    storageBucket: "friends-community-c4087.firebasestorage.app",

    messagingSenderId: "815934807083",

    appId: "1:815934807083:web:70e2432303cabdcd955e6e",

    measurementId: "G-PKCTML2JF5"

};




// Initialize Firebase

const app = initializeApp(firebaseConfig);




// Export Firebase services

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);




// Analytics

export const analytics = getAnalytics(app);





console.log("Firebase connected successfully!");
