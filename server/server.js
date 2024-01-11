const app = require('./src/app');

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
