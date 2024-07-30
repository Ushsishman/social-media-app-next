import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
require("dotenv").config();
const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_FIREBASE_DATABASE_URL,
  storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET_TWO,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireStoreDatabase = getFirestore(app);
const storage = getStorage(app);

export { auth, fireStoreDatabase, storage };
