var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(81);
console.log("server is running...")

// 1. 서버 접속시 쿼리 실행해서 DB에서 데이터 읽어오기.
var mysql = require('mysql');
// npm install mysql

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3308,
  user:'root',
  password: '1234',
  database: 'test'  // test라는 데이터베이스에 접속
});



// news 테이블 생성, no, title, content 컬럼 생성
// /newsListPage 라우터로 접속 -> newsList.html 파일 응답으로 전송
// 전송 후 브라우저에서 페이지가 로드되면 ajax로 뉴스테이블의 모든 데이터를 읽어와서 제목, 내용만 화면에 출력.
// Main
app.get('/', function (req, res) {
  res.send("newsList.html");
});
app.get('/newsList', function (req, res) {
  res.sendfile("newsList.html");
});
app.get('/newsPost', function (req, res) {
  res.sendfile("newsPost.html");
});
app.get('/newsEdit', function (req, res) {
  res.sendfile("newsEdit.html");
});

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb'}));



// <<< newsList >>>
// R select
app.get('/selectNewsFromServer', function (req, res) {

  // GET 방식으로 쿼리에 DB의 q_no 정보가 날아오면 해당 row만 조회, 정보가 날아오지 않아 undefined일 경우 모든 DB를 조회.
  var q_no = req.query.q_no;
  var condition = "";
  if (q_no != undefined) {
    condition = "where no=" + q_no;
  }

  connection.query(`select * from news ${condition}`,
    function (err, rows, fields) {
      if (err) throw err;
      // 쿼리 결과 가져온거
      for (var i = 0; i < rows.length; i++) {
        var data = rows[i];
        console.log(data.no, data.title, data.content);
      }
      res.send(rows);
    }
  );
});

// D delete
app.delete('/deleteNewsFromServer', function (req, res) {
  console.log(req.body);
  var q_no = Number(req.body.q_no);

  connection.query(`delete from news where no='${q_no}'`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send()
    }
  );
});

// U put
app.put('/putNewsFromServer', function (req, res) {
  var q_no = Number(req.body.q_no);
  var q_title = String(req.body.q_title);
  var q_content = String(req.body.q_content);

  connection.query(`update news set title='${q_title}', content='${q_content}' where no='${q_no}'`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send();
    }
  );
});

// <<< newsPost >>>
// C insert
app.post('/insertNewsFromServer', function (req, res) {
  console.log(req.body);
  var q_title = String(req.body.q_title);
  var q_content = String(req.body.q_content);

  connection.query(`insert into news (title, content) values('${q_title}','${q_content}')`,
    function (err, rows, fields) {
      if (err) throw err;
      res.send();
    }
  );
});
