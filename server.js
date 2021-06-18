const express = require('express');
const app = express();

const PORT = 10000;

app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    console.log('Received connection.');
    res.send('Received connection.')
})

app.post('/', (req, res) => {
    console.log('Received a message ... ');
    let data ='';
    console.log('... processing ...');
    req.on('data', chunk => {
        data += chunk;
    })
    console.log('... parsing JSON ...');
    req.on('end', () => {
        const parsedMessage = JSON.parse(data).message;
        console.log(`The message received was: ${parsedMessage}`);
        res.send('Message received.');
    })
})

app.listen(PORT, () => console.log('server listening on port ', PORT));