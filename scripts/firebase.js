
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: import.meta.env.vite_apikey,
  authDomain: import.meta.env.vite_authDomain,
  projectId: import.meta.env.vite_projectId,
  storageBucket: import.meta.env.vite_storageBucket,
  messagingSenderId: import.meta.env.vite_messagingSenderId,
  appId: import.meta.env.vite_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function addUserData(uid, name, email) {
  try {
    await setDoc(doc(db, "users", uid), {
      name,
      email,
      skills: [],
      createdAt: new Date()
    });
    console.log("User data saved successfully!");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
}




export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, addUserData,};
