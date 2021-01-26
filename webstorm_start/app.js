var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(81);
console.log("Server is running...");
var num1 = 3;
var num2 = 5;
var result;
result = function (i, j) {
    return i / j;
};
console.log(result(num1, num2));
// app.get('/', function(req, res)) {
//
// }
var main = app.get('/', function (req, res) {
    res.send("Hello world!");
});
