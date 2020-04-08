import { firebaseConfig } from "./config";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;

export default firebase;
