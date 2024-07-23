import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${process.env.NEXT_FIREBASE_API_KEY}`,
  authDomain: `${process.env.NEXT_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.NEXT_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.NEXT_FIREBASE_APP_ID}`,
  databaseURL: `${process.env.NEXT_FIREBASE_DATABASE_URL}`,
  storageBucket: `${process.env.NEXT_FIREBASE_STORAGE_BUCKET_TWO}`,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const realTimeDatabase = getDatabase(app);
const fireStoreDatabase = getFirestore(app);
const storage = getStorage(app);
const imagesRef = ref(storage, "images/");

export { auth, realTimeDatabase, fireStoreDatabase, storage, imagesRef };
