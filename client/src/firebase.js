import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBT4pu9ve8zrqSz0CmxENE3KDp8AbSWEn0",
  authDomain: "libhood-7.firebaseapp.com",
  projectId: "libhood-7",
  storageBucket: "libhood-7.appspot.com",
  messagingSenderId: "887318886355",
  appId: "1:887318886355:web:7822c502c98a7af9366126",
  measurementId: "G-79GE8Z0ZVD",
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
