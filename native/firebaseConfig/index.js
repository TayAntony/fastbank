
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore, query, getDocs, collection, where, addDocs} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJO1secipPCU94IR-NgRWVsoNrlzbLZcA",
  authDomain: "fastbank-1f871.firebaseapp.com",
  projectId: "fastbank-1f871",
  storageBucket: "fastbank-1f871.appspot.com",
  messagingSenderId: "1051690351448",
  appId: "1:1051690351448:web:7ad63f05fbe6076f7b032d",
  measurementId: "G-29ELS0D29S"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)


export {
  app, auth, db, storage
} 