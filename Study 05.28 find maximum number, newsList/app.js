var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(81);
console.log("server is running...")

// 1. 가장 큰 수 구하기 함수
app.get('/function', function (req, res) {
  res.sendfile("function.html");
});

var testVal = "abc";

app.get('/setVal', function (req, res) {
  testVal = req.query.val;
  res.send("ok");
});

app.get('/getVal', function(req, res) {
  res.send(testVal)
});
