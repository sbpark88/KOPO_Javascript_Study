var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(81);

app.get('/Study1', function (req, res) {
  res.sendfile("Study1 Matrix.html");
});

app.get('/Study2', function (req, res) {
  res.sendfile("Study2 RadioBox Calc.html");
});

app.get('/Study3', function (req, res) {
  res.sendfile("Study3 RadioBox Calc2.html");
});

app.get('/Study4', function (req, res) {
  res.sendfile("Study4 jquery.html");
});

app.get('/Study5', function (req, res) {
  res.sendfile("Study5 ChangeToJquery.html");
});

app.get('/Study6query', function (req, res) {
  console.log(req.query);
  if(req.query.a==10) {
    res.send("a는 10입니다.");
  }
  // if(req.query.a==20) {
  //   res.send("a는 20입니다.");
  // }
  // res.send("Hello world");

  // res.send(`합은 ${Number(req.query.num1) + Number(req.query.num2)}`);

  // var num1 = Number(req.query.num1);
  // var num2 = Number(req.query.num2);
  // res.send(`합은 ${num1 + num2} 입니다.`);
});

app.get('/Study7Ajax', function (req, res) {
  res.sendfile("Study7Ajax.html");
});



console.log("server is running...")
