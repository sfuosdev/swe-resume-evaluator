import { initializeApp } from 'firebase/app';
require('dotenv').config();

/*
    get api key from firebase
*/
const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGE_SENDER_ID,
    appId: process.env.FB_APP_ID,
};
const app = initializeApp(firebaseConfig);

export default app;