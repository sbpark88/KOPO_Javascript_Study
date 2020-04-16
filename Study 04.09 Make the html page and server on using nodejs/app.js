var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(80);

app.get('/test', function (req, res) {
res.send("Hello world");
});

app.get('/test2', function (req, res) {
res.send("Hello world2");
});

app.get('/mypage', function (req, res) {
res.sendfile("lecture1.html");
});

console.log("server is running...")
