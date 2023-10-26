const express = require('express');
<<<<<<< HEAD
const authRouter = require('./routes/auth/auth');
const bodyParser = require('body-parser');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
=======
const authRouter = require('./auth/auth');
const bodyParser = require('body-parser');
>>>>>>> f08453e (before merging)

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const options = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'SWE Resume Evaluator Express API with Swagger',
            version: '0.1.0',
            description: 'API with Express JS',
        },
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true }),
);

app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

module.exports = app;
