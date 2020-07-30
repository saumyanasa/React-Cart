import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAbwWa0bAtTvJ1VfagKrBCvRjKG4OsKjB0",
    authDomain: "cart-2ae7f.firebaseapp.com",
    databaseURL: "https://cart-2ae7f.firebaseio.com",
    projectId: "cart-2ae7f",
    storageBucket: "cart-2ae7f.appspot.com",
    messagingSenderId: "75462558815",
    appId: "1:75462558815:web:6f897fed28bf6307b187ea"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

ReactDOM.render( < App / > , document.getElementById('root'));