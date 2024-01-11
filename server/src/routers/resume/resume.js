const express = require('express');
const multer = require('multer');
// eslint-disable-next-line import/no-extraneous-dependencies
const { PythonShell } = require('python-shell');
const path = require('path');

const router = express.Router();

// req.file = { fieldname, originalname, ..., destination, filename, ...}
// multipart/form-data
const storage = multer.diskStorage({
    destination: (req, file, done) => {
        done(null, path.join(__dirname, '../../../resources/'));
    },
    filename: (req, file, callback) => {
        // change filename to original name
        callback(null, file.originalname);
    },
});

const upload = multer({ storage });

/**
 * @swagger
 * paths:
 *  /resume:
 *   post:
 *      summary: Get a pdf file and  when user uploads pdf file
 *      tags: [Resume]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                user_id:
 *                  type: string
 *                resume:
 *                  type: string
 *                  description: file type should be pdf
 *      responses:
 *        200:
 *          description: Successful upload of pdf file
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    default: 'OK'
 *                  status:
 *                    type: integer
 *                    default: 200
 *                  job_matches:
 *                    type: object
 *        400:
 *          description: Unsuccessful upload/request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    default: '[ERROR_MESSAGE]'
 *                  status:
 *                    type: integer
 *                    default: 400
 */
router.post('/', upload.single('file'), async (req, res) => {
    try {
        // res.set('Access-Control-Allow-Origin', '*');
        // console.log(req.file); // req.file = { fieldname, originalname, ..., destination, filename, ...}
        const filePath = path.join(
            __dirname,
            '../../../resources',
            req.file.filename,
        );
        const pyPath = path.join(__dirname, '../../../python/');
        const options = {
            scriptPath: path.join(__dirname, '../../../python'),
            args: [filePath, pyPath],
        };
        // let pyshell = new PythonShell('classifier_2.py', options);
        // pyshell.on('message', function (message) {
        //     console.log(message)
        // });
        const result = await PythonShell.run('classifier_2.py', options);
        return res.status(200).json({
            message: 'OK',
            status: 200,
            job_matches: JSON.parse(result),
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            status: 400,
        });
    }
});

module.exports = router;
