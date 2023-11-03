import app from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAuTLnft77dXEMYB-5Py-XvP9jgAzsGnWY",
    authDomain: "job-portal-ab6c7.firebaseapp.com",
    projectId: "job-portal-ab6c7",
    storageBucket: "job-portal-ab6c7.appspot.com",
    messagingSenderId: "213940092475",
    appId: "1:213940092475:web:df4d54d69b17e5d5a9e61e" 
  };

  // Initialize Firebase
  const firebase = app.initializeApp(firebaseConfig);
  const firestore = firebase.firestore(); 

  export {firebase,firestore,app};