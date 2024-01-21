const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routers/auth');
const resumeRouter = require('./routers/resume/resume');
const { swaggerUi, specs } = require('./swagger');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
});

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true }),
);

app.use('/auth', authRouter);
app.use('/resume', resumeRouter);

module.exports = app;
