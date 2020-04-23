var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(80);

app.get('/signin', function (req, res) {
res.sendfile("signinPage.html");
});

app.get('/looptest', function (req, res) {
res.sendfile("forLoop.html");
});

console.log("server is running...")
