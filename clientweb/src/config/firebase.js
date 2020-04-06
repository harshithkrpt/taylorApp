import { firebaseConfig } from "./config";
import firebase from "firebase";

const app = firebase.initializeApp(firebaseConfig);

export const storage = app.storage();
