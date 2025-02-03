import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCSjKCcIUaLKbS9MuwOMeCb-y5J51xa_JU",
  authDomain: "twitter-3f63a.firebaseapp.com",
  projectId: "twitter-3f63a",
  storageBucket: "twitter-3f63a.firebasestorage.app",
  messagingSenderId: "997091691186",
  appId: "1:997091691186:web:78e72e379a3050ded3d7ab",
  measurementId: "G-PDBLLH1FKV"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app