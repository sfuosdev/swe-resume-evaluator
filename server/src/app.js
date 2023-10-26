const express = require('express');
const authRouter = require('./auth/auth');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

module.exports = app;
