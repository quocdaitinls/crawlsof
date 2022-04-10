import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const config = {
  apiKey: "AIzaSyDoJkbzZ52Mbc6p_iFfo4wSr3jvBvYN_Uk",
  authDomain: "studenthub-18f50.firebaseapp.com",
  projectId: "studenthub-18f50",
  storageBucket: "studenthub-18f50.appspot.com",
  messagingSenderId: "638527148771",
  appId: "1:638527148771:web:4957afd929706338806bd6",
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = (
  setUser: (user: firebase.User | null) => void
) => {
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      console.log(res.user);
      setUser(res.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default firebase;
