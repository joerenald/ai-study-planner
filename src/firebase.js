import { initializeApp }
from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

// ==========================================
// FIREBASE CONFIG
// ==========================================
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA66kBn63CpKzo91epbcq7D066rKLwk9yw",
  authDomain: "ai-study-planner-c44ea.firebaseapp.com",
  projectId: "ai-study-planner-c44ea",
  storageBucket: "ai-study-planner-c44ea.firebasestorage.app",
  messagingSenderId: "26518877528",
  appId: "1:26518877528:web:475423ac2255b56350a12d",
  measurementId: "G-KBZN5LH1R9"
};

// ==========================================
// INITIALIZE FIREBASE
// ==========================================

const app =
  initializeApp(firebaseConfig);

// ==========================================
// AUTH
// ==========================================

export const auth =
  getAuth(app);

// ==========================================
// PROVIDERS
// ==========================================

export const googleProvider =
  new GoogleAuthProvider();

export const githubProvider =
  new GithubAuthProvider();