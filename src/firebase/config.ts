// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTQaooiojtYQoPpfXFYX0CejxSrBAgkh8",
  authDomain: "fekdi-d5df4.firebaseapp.com",
  projectId: "fekdi-d5df4",
  storageBucket: "fekdi-d5df4.appspot.com",
  messagingSenderId: "351148118384",
  appId: "1:351148118384:web:5263baa30571f475da3fb5",
  measurementId: "G-C4N6NGQ7WE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, analytics, db, storage };
