import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp, getApp, getApps } from "firebase/app";

const firebaseConfig = {
  appId: process.env.NEXT_PUBLICFIREBASE_APP_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.NEXT_PUBLICFIREBASE_STORAGE_BUCKET,
  measurementId: process.env.NEXT_PUBLICFIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLICFIREBASE_MESSAGING_SENDER_ID,
};

// Initialize Firebase
const apps = getApps();
let app;

if(!apps?.length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
export const db = getFirestore(app);