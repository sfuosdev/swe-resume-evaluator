const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routers/auth');
const { swaggerUi, specs } = require('./swagger');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
