var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(80);
console.log("server is running...")

// 1. 서버 접속시 쿼리 실행해서 DB에서 데이터 읽어오기.
var mysql = require('mysql');
// npm install mysql

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3308,
  user:'root',
  password: '1234',
  database: 'javascript'  // test라는 데이터베이스에 접속
});

app.get('/', function (req, res) {
  res.sendfile("view.html");
});
app.get('/home', function (req, res) {
  res.sendfile("view.html");
});
app.get('/main', function (req, res) {
  res.sendfile("view.html");
});
app.get('/inputValue', function (req, res) {
  res.sendfile("input.html");
});

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb'}));



app.get('/view', function (req, res) {
  // connection.query(`select * from inputvalue`,
  connection.query(`SELECT * FROM inputvalue ORDER BY idx DESC LIMIT 1`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.post('/input', function (req, res) {
  var myVal = req.body.myVal;
  connection.query(`insert into inputvalue (myvalue) values('${myVal}')`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send();
    }
  );
});
