var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(80);
console.log("\n\nServer is running...\n\n")

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
  res.sendfile("stockList.html");
});
app.get('/main', function (req, res) {
  res.sendfile("stockList.html");
});

app.get('/realTimePrice', function (req, res) {
  res.sendfile("realTimePrice.html");
});

// 메인 페이지 접속시 stockInfo 테이블 정보를 가져오는 라우터, 실시간 주식 정보 페이지에서 '가격보기' 버튼 클릭시 해당 기업 주식 URL 정보 가져오는 라우터
app.get('/getStockInfo', function (req, res) {
  var query = `SELECT * FROM stockInfo`;
  connection.query(query, function (err, rows, fields) {
      if (err) throw err;
      // console.log(rows);
      res.send(rows);
    }
  );
});

// 실시간 주식 정보 페이지에서 '가격보기' 버튼 클릭시 주식 정보 읽어오는 라우터
app.get('/getStockPrice', function (req, res) {
  var stockUrl = req.query.stockUrl;
  const options = {
    url:`${stockUrl}`,
    method: 'GET'
  }
  request.get(options, function(err,httpResponse,body){
    response = JSON.parse(httpResponse.body);
    var price = response.result.areas[0].datas[0].nv;
    res.send(''+price);
  });
});

// 서버 기동시 매 초마다 DB에 주식 정보를 기록
const hynix = {
  url:'https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:000660|SERVICE_RECENT_ITEM:000660',
  method: 'GET'
}
const coway = {
  url:'https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:021240|SERVICE_RECENT_ITEM:021240',
  method: 'GET'
}
const lgelectronics = {
  url:'https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:066570|SERVICE_RECENT_ITEM:066570',
  method: 'GET'
}
const cj = {
  url:'https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:001040|SERVICE_RECENT_ITEM:001040',
  method: 'GET'
}
const chongkundang = {
  url:'https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:185750|SERVICE_RECENT_ITEM:185750',
  method: 'GET'
}
setInterval(function () {
  request.get(hynix, function(err,httpResponse,body){
    response = JSON.parse(httpResponse.body);
    var price = response.result.areas[0].datas[0].nv;
    connection.query(`INSERT INTO hynix (price) VALUES('${price}');`)
  });
  request.get(coway, function(err,httpResponse,body){
    response = JSON.parse(httpResponse.body);
    var price = response.result.areas[0].datas[0].nv;
    connection.query(`INSERT INTO coway (price) VALUES('${price}');`)
  });
  request.get(lgelectronics, function(err,httpResponse,body){
    response = JSON.parse(httpResponse.body);
    var price = response.result.areas[0].datas[0].nv;
    connection.query(`INSERT INTO lgelectronics (price) VALUES('${price}');`)
  });
  request.get(cj, function(err,httpResponse,body){
    response = JSON.parse(httpResponse.body);
    var price = response.result.areas[0].datas[0].nv;
    connection.query(`INSERT INTO cj (price) VALUES('${price}');`)
  });
  request.get(chongkundang, function(err,httpResponse,body){
    response = JSON.parse(httpResponse.body);
    var price = response.result.areas[0].datas[0].nv;
    connection.query(`INSERT INTO chongkundang (price) VALUES('${price}');`)
  });
},1000);
