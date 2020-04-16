var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(80);

app.get('/testcss', function (req, res) {
res.sendfile("css.html");
});

app.get('/testjs', function (req, res) {
res.sendfile("javascript.html");
});

console.log("server is running...")
