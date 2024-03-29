import React, { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, onAuthStateChanged } from "../../Config/firebase";
import {
  query,
  where,
  collection,
  getDocs,
  setDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AppContext = ({ children }) => {
  const collectionUsersRef = collection(db, "users");
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
  const [selected, setSelected] = useState();

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const popup = await signInWithPopup(auth, provider);
      const user = popup.user;
      const q = query(collectionUsersRef, where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          authProvider: popup?.providerId,
          kind: "kind",
          species: "species",
          dateOfBirth: "dateOfBirth",
          habitat: "habitat",
          description: "description",
        });
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const registerWithEmailAndPassword = async (
    name,
    email,
    password,
    isPage
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await updateProfile(user, {
        displayName: name,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/petfluencer-59b74.appspot.com/o/DONOTDELETE.png?alt=media&token=761dee90-5bb4-4b48-9723-162faf44147c",
      });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        image: user.photoURL,
        providerId: "email/password",
        email: user.email,
        kind: "kind",
        species: "species",
        dateOfBirth: "dateOfBirth",
        habitat: "habitat",
        description: "description",
        isPage: isPage || false,
        occupation: "occupation",
        pageDescription: "pageDescription",
        contact: "contact",
        others: "others",
      });
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const sendPasswordToUser = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("New password sent to your email");
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const userStateChanged = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collectionUsersRef, where("uid", "==", user.uid));
        await onSnapshot(q, (doc) => {
          setUserData(doc?.docs[0]?.data());
        });
        setUser(user);
      } else {
        setUser(null);
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    userStateChanged();
    if (user || userData) {
      navigate("/");
    } else {
      navigate("/login");
    }
    return () => userStateChanged();
  }, []);

  const initialState = {
    signInWithGoogle: signInWithGoogle,
    loginWithEmailAndPassword: loginWithEmailAndPassword,
    registerWithEmailAndPassword: registerWithEmailAndPassword,
    sendPasswordToUser: sendPasswordToUser,
    signOutUser: signOutUser,
    user: user,
    userData: userData,
    selected: selected,
    setSelected: setSelected,
    attributes: userData?.isPage
      ? ["name", "occupation", "pageDescription", "contact", "others"]
      : ["kind", "species", "dateOfBirth", "habitat", "description"],
  };

  return (
    <div>
      <AuthContext.Provider value={initialState}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AppContext;
