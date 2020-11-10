var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(81);
console.log("Server is running...");

app.get('/', function (req, res) {
  res.sendfile("test.html");
});
app.get('/main', function (req, res) {
  res.sendfile("test.html");
});
