import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyBF3mKIAwigPNkZZEczDbmvEMqejv7Glt8",
    authDomain: "sushistore-4619f.firebaseapp.com",
    databaseURL: "https://sushistore-4619f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sushistore-4619f",
    storageBucket: "sushistore-4619f.appspot.com",
    messagingSenderId: "313727732490",
    appId: "1:313727732490:web:cb2a7d3b699e7dc1b1c8f3"
};


// Initialize Firebase
export const appFireStore = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service

export const dbFireStore = getFirestore(appFireStore);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(appFireStore);

// Create a storage reference from our storage service
// export const storageRefImg = ref(storage);


// export { appFireStore };



