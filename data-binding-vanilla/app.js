const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app).listen(80);
console.log("Server is running on port: 80");

app.get('/', (req, res) => {
    res.sendFile('/main.html', { root: __dirname });
});

app.get('/main.js', (req, res) => {
    res.sendFile('/main.js', { root: __dirname });
});