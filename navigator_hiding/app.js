var express = require('express');
var app = express();
var http = require('http');
const path = require('path');
var server = http.createServer(app).listen(81);
console.log('Server is listening on localhost:81.');

const __rootDir = 'd:/';
const __baseDir = 'gitStudy/JavaScript_Study/JavaScript/navigator_hiding';
const __projectDir = path.join(__rootDir, __baseDir);

// app.use('url 경로', express.static('서버경로'));
app.use('/css', express.static('./static/css'));
app.use('/js', express.static('./static/js'));
const main = app.get('/', (req, res) => {
  let fileName = 'main.html';
  let options = {
    root: __projectDir
  };
  res.sendFile(fileName, options);
});



// app.get('/', function (req, res) {
//   res.sendfile("main.html");
// });