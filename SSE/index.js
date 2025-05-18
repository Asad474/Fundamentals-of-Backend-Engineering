const app = require('express')();

let i = 0;

const performSend = (res) => {
    res.write(`data: hello from server --- ${i++}\n\n`);
    setTimeout(() => performSend(res), 1000);
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => res.send('Hello!'));

app.get('/stream', (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    performSend(res);
});

app.listen(8080, () => {
    console.log('Server is listening at port 8080');
});