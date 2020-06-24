var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(81);

app.get('/looptest', function (req, res) {
res.sendfile("forLoop.html");
});

console.log("server is running...")
