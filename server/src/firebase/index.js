require('dotenv').config();

const firebase = require('firebase-admin');

/*
    get api key from firebase
*/
const fbAdmin = firebase.initializeApp({
    credential: firebase.credential.cert({
        type: 'service_account',
        project_id: process.env.FB_PROJECT_ID,
        private_key_id: process.env.FB_PRIVATE_KEY_ID,
        private_key: process.env.FB_PRIVATE_KEY,
        client_email: process.env.FB_CLIENT_EMAIL,
        client_id: process.env.FB_CLIENT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url:
            'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url:
            'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-f2i9t%40swe-resume-evaluator.iam.gserviceaccount.com',
        universe_domain: 'googleapis.com',
    }),
});

module.exports = fbAdmin;
