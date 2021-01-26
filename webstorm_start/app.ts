var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(81);

console.log("Server is running...")

// let num1 = 3;
// let num2 = 0;
// let result;
//
// result = (i, j) => {
//     return (j != 0 ? i / j : '연산 불가')
// };

let num1 = 3;
let num2 = 5;
let result;

result = (i, j) => {
    try {
        return i / j;
    } catch (e) {

    }
};

console.log(result(num1, num2));

// app.get('/', function(req, res)) {
//
// }

const main = app.get('/', (req, res) => {
    res.send("Hello world!")
});
