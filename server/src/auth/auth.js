require('dotenv').config();

const express = require('express');
const router = express.Router();
const firebase = require('firebase-admin');

/*
    get api key from firebase
*/
const fbAdmin = firebase.initializeApp({
    credential: firebase.credential.applicationDefault()
});

async function checkUserInFirebase(email) {
    return new Promise((resolve) => {
        fbAdmin.auth().getUserByEmail(email)
            .then((user) => {
                resolve(true);
            })
            .catch((err) => {
                resolve(false);
            });
    });
}

/** 
 * @param {json} req - request body
 * requested body will contain the following fields:
    * email - string
    * username - string
    * password - string
 * @return {json} res - response body
 * response body will contain the following fields:
 * if successful:
    * message - string
    * status - number
    * user_token - string
* if unsuccessful:
    * message - string
    * status - number
 * */ 

router.post('/signup', async (req, res) => { 
    try {
        const { email, username, password } = req.body;

        // check the password length is valid (< 8)
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters",
                status: 400
            });
        }

        // check the email format is valid
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Email that was provided is invalid format",
                status: 400
            });
        }

        // check the user name format is valid
        const usernameRegex = /^[a-zA-Z0-9._-]{4,}$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                message: "Username is invalid format",
                status: 400
            });
        }

        const alreadyExist = await checkUserInFirebase(email);
        if (alreadyExist) {
            return res.status(400).json({
                message: "User already exists with the given email address",
                status: 400
            });
        }

        const user = await fbAdmin.auth().createUser({
            username,
            email,
            password
        })

        // check the user 
        console.log(user);

        // create a user token 
        const userToken = await fbAdmin.auth().createCustomToken(user.uid);  

        // return successful registration response 
        return res.status(200).json({
            message: "ok",
            status: 200,
            user_token: userToken
        });

    } catch (error) { 
        const errorMessage = error.message;
        return res.status(400).json({
            message: errorMessage,
            status: 400
        });
    }
});

module.exports = router;