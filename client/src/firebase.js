import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDcPB6gi8ze04jrwfDEkPAsEeLGeHZ0LRU",
  authDomain: "bookmystay-393513.firebaseapp.com",
  projectId: "bookmystay-393513",
  storageBucket: "bookmystay-393513.appspot.com",
  messagingSenderId: "991571336649",
  appId: "1:991571336649:web:40c76d0c0c2b22b57fdc18"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)