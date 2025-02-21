import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAXs_5Xsy4Euc3On-pDO2VvG1ujuKBt8Ew",
  authDomain: "furnish-5832d.firebaseapp.com",
  projectId: "furnish-5832d",
  storageBucket: "furnish-5832d.firebasestorage.app",
  messagingSenderId: "842011303052",
  appId: "1:842011303052:web:ae54f35e0f2f79ff81efa9",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
