/*
    signIn.js
    API that users will sign in with their email and password through firebase
*/

import app from './auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

/**
 * @param {json} req - request body
 * @return {json} res - response body
 * if successful:
 *    * message - string
 *    * status - number
 * if unsuccessful:
 *   * message - string (error message)
 *   * status - number
 */
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();

        // if there is no information about the user, then return 400 status
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                status: 400
            });
        }

        return res.status(200).json({
            message: "Successfully signed in",
            status: 200,
            user_token: token
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            status: 400
        });
    }
})