import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDTDHS42wxnYcKqff2l3n-mLiSISFdiDWc",
    authDomain: "foodapp-database.firebaseapp.com",
    projectId: "foodapp-database",
    storageBucket: "foodapp-database.appspot.com",
    messagingSenderId: "192606713439",
    appId: "1:192606713439:web:cf8aa2b2170c4e5c200dea",
    measurementId: "G-C206SR6CFV"
};

firebase.initializeApp(firebaseConfig)

export default firebase;