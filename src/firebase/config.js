import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.APIKEY, //"AIzaSyCHdYlchPUZd5-Jb1mKUyrMZd4sP4fbCjM"
  authDomain: process.env.AUTHDOMAIN, //"marmite-se-alimentacao.firebaseapp.com"
  projectId:  process.env.PROJECTID, //"marmite-se-alimentacao",
  storageBucket:  process.env.STORAGEBUCKET, //"marmite-se-alimentacao.appspot.com",
  messagingSenderId: process.env.MESSAGINGSENDERID, //"664837155009",
  appId:  process.env.APPID, //"1:664837155009:web:92471f61de69e79d28cc40"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
export const auth = getAuth(app);