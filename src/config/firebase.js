import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/";
// import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBgu3odBeJbTsAM7imUCOKeFtfiex2E1mU",
  authDomain: "hashsocial-cf99e.firebaseapp.com",
  projectId: "hashsocial-cf99e",
  storageBucket: "hashsocial-cf99e.appspot.com",
  messagingSenderId: "669036885540",
  appId: "1:669036885540:web:7b81700f3cea28caf40ab1",
  measurementId: "G-EZDHBXSYWR",
  // databaseURL: "https://hashsocial-cf99e-default-rtdb.firebaseio.com",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // const database = getDatabase(app);
}

export {firebase};
