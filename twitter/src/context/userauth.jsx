import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from "./firebase";
import { createContext, useContext, useEffect, useState } from "react";

const userAuthcontext = createContext();

export function UserAuthContextprovider({ children }) {
  const [user, setUser] = useState([]);
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function createwithemail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return signOut(auth);
  }
  function googlesignIn() {
    const googleauthprovider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleauthprovider);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });
    return () => {
      unsubscribe;
    };
  }, []);
  return (
    <userAuthcontext.Provider
      value={{ user, login, createwithemail, logout, googlesignIn }}
    >
      {children}
    </userAuthcontext.Provider>
  );
}

export function useUserAuth(){
    return useContext(userAuthcontext)
}