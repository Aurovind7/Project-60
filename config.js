import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDBitoNBD_xb-YqdUd19omA6STg43Z_qFI",
    authDomain: "project-60-and-62.firebaseapp.com",
    databaseURL: "https://project-60-and-62-default-rtdb.firebaseio.com",
    projectId: "project-60-and-62",
    storageBucket: "project-60-and-62.appspot.com",
    messagingSenderId: "348687609114",
    appId: "1:348687609114:web:4aabf54f259a8fccbb90a3"
  };

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
 

console.log(firebase.name);
console.log(firebase.database());
 