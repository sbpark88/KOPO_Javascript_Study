// var express = require('express');
// var app = express();
// var http = require('http');
// var server = http.createServer(app).listen(81);
// console.log("Server is running...");
//
// app.get('/', function (req, res) {
//   res.sendfile("test.html");
// });
// app.get('/main', function (req, res) {
//   res.sendfile("test.html");
// });


let ttest = {
  alpha: 'tt',
  beta: 'kk',
  gamma: 'qq'
}

// console.log(ttest.alpha);
// console.log(ttest["alpha"]);

let str;

for (let i in ttest) {
  str += `${i}=${ttest[i]}&`;
}
console.log(str);