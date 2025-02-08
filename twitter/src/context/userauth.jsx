import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect 
 
} from 'firebase/auth';

import { auth } from "./firebase";
import { createContext, useContext, useEffect, useState } from "react";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function createWithEmail(email, password) {
    let res = await createUserWithEmailAndPassword(auth, email, password);
    return res
  }

  function logout() {
    return signOut(auth);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("Auth State Changed:", currentUser);
      setUser(currentUser);
    });

    return () => {
      unsubscribe(); // Properly unsubscribe
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        login,
        createWithEmail,
        logout,
        googleSignIn,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
