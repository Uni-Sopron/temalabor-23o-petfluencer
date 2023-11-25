import React, { createContext, useState, useEffect} from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth, db, onAuthStateChanged} from '../Firebase/firebase';

export const AuthContext = createContext();

const AppContext = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState();
    const [userData, setUserData] = useState();


    const signInWithGoogle = async () => {
        const popup = await signInWithPopup(auth, provider);
        console.log("popup", popup);
    };

    
    const initialState = {
        signInWithGoogle: signInWithGoogle,
    };


  return (
    <div>
        <AuthContext.Provider value={initialState}>
            {children}
        </AuthContext.Provider>
    </div>
  );
};

export default AppContext