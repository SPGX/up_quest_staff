import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBMkOOaw3gtQ-ssNMKfGlrTF06kO5FyGxA",
    authDomain: "upquest-b9a89.firebaseapp.com",
    projectId: "upquest-b9a89",
    storageBucket: "upquest-b9a89.appspot.com",
    messagingSenderId: "956301839740",
    appId: "1:956301839740:web:1ed3488cd6a607d2d8a8f9"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
