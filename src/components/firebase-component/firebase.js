import firebase from "firebase";
    
 const firebaseConfig = {
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
   authDomain: "kay-crypto-exchanger.firebaseapp.com",
   databaseURL: "https://kay-crypto-exchanger.firebaseio.com",
   projectId: "kay-crypto-exchanger",
   storageBucket: "kay-crypto-exchanger.appspot.com",
   messagingSenderId: "661540929366",
   appId: process.env.REACT_APP_FIREBASE_APP_ID,
   measurementId: "G-04VPXMKWRM",
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
firebase.analytics();
 export const db = firebase.firestore();
 export const auth = firebase.auth();
 export default firebase;
