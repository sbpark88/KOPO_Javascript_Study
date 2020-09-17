var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(80);
console.log("Server is running...")


var mysql = require('mysql');
var request = require('request');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3308,
  user:'root',
  password: '1234',
  database: 'javascript'
});
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb'}));

app.get('/', function (req, res) {
  res.sendfile("main.html");
});
app.get('/main', function (req, res) {
  res.sendfile("main.html");
});
app.get('/writePage', function (req, res) {
  res.sendfile("writePage.html");
});
app.get('/editPage', function (req, res) {
  res.sendfile("editPage.html");
});


// 글 포스팅
app.post('/insertNewsFromServer', function (req, res) {
  console.log(req.body);
  var q_title = String(req.body.q_title);
  var q_content = String(req.body.q_content);

  connection.query(`insert into posting (title, content) values('${q_title}','${q_content}')`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send();
    }
  );
});

// 글 읽어오기
app.get('/post', function (req, res) {
  if(req.query.no) {
    var q = `select * from posting where no = ${req.query.no}`;
    connection.query(q, function (err, rows, fields) {
      res.send(rows);
    })
  } else {
    var q = `select * from posting`;
    connection.query(q, function (err, rows, fields) {
      res.send(rows);
    })
  }
});

// 글 업데이트
app.put('/post', function (req, res) {
  var q_no = Number(req.body.q_no);
  var q_title = String(req.body.q_title);
  var q_content = String(req.body.q_content);

  connection.query(`update posting set title='${q_title}', context='${q_content}' where no='${q_no}'`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send();
    }
  );
});
