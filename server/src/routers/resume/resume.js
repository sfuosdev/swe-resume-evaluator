const express = require('express');
const router = express.Router();
const multer = require('multer');

// req.file = { fieldname, originalname, ..., destination, filename, ...}
// multipart/form-data
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname + '/upload/');
    },

    filename: (req, file, callback) => {
        // change filename to original name
        callback(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

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
 *                  category_matches:
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
router.post('/', upload.single('file'), (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file); // req.file = { fieldname, originalname, ..., destination, filename, ...}

        return res.status(200).json({
            message: 'OK',
            status: 200,
            category_matches: {
                1: {
                    category_id: 1234,
                    category_name: 'software engineer',
                    weight_sum: 87,
                },
                2: {
                    category_id: 2222,
                    category_name: 'business analyst',
                    weight_sum: 35,
                },
            },
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            status: 400,
        });
    }
});

module.exports = router;
