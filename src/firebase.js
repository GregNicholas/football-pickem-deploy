import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import "firebase/compat/storage";
//import { collection, addDoc } from "firebase/compat/firestore"; 

// PRODUCTION VERSION
const app = firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

// FOR DEVELOPMENT
// const app = firebase.initializeApp({
// 	apiKey: process.env.REACT_APP_FIREBASE_DEV_API_KEY,
// 	authDomain: process.env.REACT_APP_FIREBASE_DEV_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_FIREBASE_DEV_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_FIREBASE_DEV_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_FIREBASE_DEV_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_FIREBASE_DEV_APP_ID,
// });

export const auth = app.auth();
export const storage = app.storage();
export const db = app.firestore();
export default app;
