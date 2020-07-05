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
  database: 'javascript'  // test라는 데이터베이스에 접속
});

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb'}));

app.get('/', function (req, res) {
  res.sendfile("newMain.html");
});
app.get('/main', function (req, res) {
  res.sendfile("newMain.html");
});
app.get('/getNaver', function (req, res) {
  const kakao = {
    url:'https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:035720|SERVICE_RECENT_ITEM:035720',
    method: 'GET'
  }

  const naver = {
    url:'https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:035420|SERVICE_RECENT_ITEM:035420',
    method: 'GET'
  }

  request.get(kakao, function(err,httpResponse,body){
    response = JSON.parse(httpResponse.body);
    var kakaoPrice = response.result.areas[0].datas[0].nv;
    // connection.query(`INSERT INTO kakao (price, navertime) VALUES('${kakaoPrice}','time');`)
    connection.query(`INSERT INTO kakao (price) VALUES('${kakaoPrice}');`)

    request.get(naver, function(err,httpResponse,body){
      response = JSON.parse(httpResponse.body);
      var naverPrice = response.result.areas[0].datas[0].nv;
      // connection.query(`INSERT INTO naver (price, navertime) VALUES('${naverPrice}','time');`)
      connection.query(`INSERT INTO naver (price) VALUES('${naverPrice}');`)
      console.log([kakaoPrice,naverPrice]);
      res.send([kakaoPrice,naverPrice]);  // 배열로 보내기 때문에 문자로 바꿔서 보낼 필요가 없다.
    });

  });
});
