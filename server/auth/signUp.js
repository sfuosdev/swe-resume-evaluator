/* 
    signUp.js
    API that users will sign up with their email address, user name, and password through firebase
*/

import app from './auth';
import { getAuth, createUserWithEmailAndPassword, getIdToken } from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore} from 'firebase/firestore';

const auth = getAuth();
const db = getFirestore();

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

app.post('/signup', async (req, res) => { 
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

        // check if the user already exists
        const userRef = doc(db, "username", username);
        const userDoc = await getDoc(userRef);

        // if the user already exists, it returns json object that user is already exists.
        if (userDoc.exists()) {
            return res.status(400).json({
                message: "Username already exists",
                status: 400
            });
        }
        
        // if the user does not exist, it creates new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password); 
        
        // Signed in 
        const user = userCredential.user;

        // check the user 
        console.log(user);

        // create a user token 
        const userToken = await getIdToken(user);  

        // store the user name into firebase 
        const newUserRef = doc(db, "user", user.uid);  
        await setDoc(newUserRef, {
            username: username
        });

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
