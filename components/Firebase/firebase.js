import { LogBox } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore'
import {apikey,authDomain,projectId,storageBucket,messagingSenderId,appId,measurementId} from '@env'
const config =  {
    apiKey: apikey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
};

LogBox.ignoreLogs(['Setting a timer']);

// Initialize Firebase App

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();

export const db = firebase.firestore()

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);
