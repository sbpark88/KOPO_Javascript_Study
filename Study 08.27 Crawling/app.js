var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(80);
console.log("Server is running...")

var mysql = require('mysql');
var request = require('request');
var cheerio = require('cheerio');
const ExcelJS = require('exceljs');

// var connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3308,
//   user:'root',
//   password: '1234',
//   database: 'javascript'
// });
var bodyParser = require("body-parser");
// extended : 객체 안의 객체를 파싱 가능하게 하려면 true로 해야한다.
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.get('/', function (req, res) {
  res.sendfile("main.html");
});
app.get('/main', function (req, res) {
  res.sendfile("main.html");
});

app.get('/getMenu', function (req, res) {
  request("http://www.kopo.ac.kr/kangseo/content.do?menu=262", function(err, res2, body) {
    const $ = cheerio.load(body);
    var menus = [];

    for(var i = 0; i < 5; i++) {
      menus.push($('td')[i*4+2].children[1].children[0].data.replace(/\n/g, "").split(","));
    }
    // console.log(menus);

    res.send(menus);
  })
})

// const options = {
//   url:'http://www.kopo.ac.kr/kangseo/content.do?menu=262',
//   method: 'GET'
// }
// request.get(options, function(err,httpResponse,body){
//   const $ = cheerio.load(body);
//   // console.log($);
//   // var meal = $('div.meal_box').find('tr:nth-child(1) > td:nth-child(3)').text().trim();
//   // var date = $('td')[0].children[0].children[0].data;
//   // console.log($('td')[2]);
//   // console.log($('td')[2].children[1]);
//   // console.log($('td')[2].children[1].children[0]);
//   console.log($('td')[2].children[1].children[0].data);
//   var meal = $('td')[2].children[1].children[0].data;
//   var menus = [];
//
//   // let meal = $(this).find('span').text();
//   // console.log(meal);
// });

// request.get({url:'http://www.kopo.ac.kr/kangseo/content.do?menu=262'}, function(err, res, body){
//   const $ = cheerio.load(body);
//   console.log($);
// });

// ajax로 데이터 넘겨받아 엑셀형식으로 만들기
app.post('/getExcel', async function (req, res) {
  var menus = req.body.menus;
  var scores = req.body.scores;

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('menu');

  const alpahbet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  const dayOfTheWeek = ['월','화','수','목','금','토','일'];

  for (var i = 0; i < menus.length; i++) {
    // console.log(`${alpahbet[i*2]}1 = ${dayOfTheWeek[i]}`);
    sheet.getCell(`${alpahbet[i*2]}1`).value = dayOfTheWeek[i]; // 1행에 월, 화, 수, 목, 금
    scores[i] = scores[i].map( str => parseInt(str) );  // str to integer (점수 array 형변환)

    for (var j = 0; j < menus[i].length; j++) {
        // console.log(`${alpahbet[i*2]}${j+2} = ${menus[i][j].trim()}`);
        // console.log(`${alpahbet[i*2+1]}${j+2} = ${scores[i][j]}`);
        sheet.getCell(`${alpahbet[i*2]}${j+2}`).value = menus[i][j].trim();
        sheet.getCell(`${alpahbet[i*2+1]}${j+2}`).value = scores[i][j];
    }
    // reduce 참고 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    // acc : 누적값, (,0 : 초기값), curr : 현재값... 그러니까 파이썬 식으로 표현하면 sum = sum + curr 이런거다.
    const sum = scores[i].reduce( ( accumulator, currentValue ) => accumulator + currentValue, 0);
    const average = sum / menus[i].length;
    const roundedAverage = ( Math.round(average*10) ) / 10; // 소수점 첫째 자리까지 표현

    // console.log(`${alpahbet[i*2]}${menus[i].length+3} = 평균`);
    sheet.getCell(`${alpahbet[i*2]}${menus[i].length+3}`).value = '평균';
    sheet.getCell(`${alpahbet[i*2+1]}${menus[i].length+3}`).value = roundedAverage;  // 계산한 평균을 입력
  }


  await workbook.xlsx.writeFile('menu.xlsx');
  // EscelJS
  res.send("ok");
});

//엑셀 형식의 데이터를 다시 넘겨 받아 엑셀 파일로 다운로드
app.get('/getExcelFile', function (req, res) {
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader("Content-Disposition", "attachment; filename=menu.xlsx");

  var fs = require('fs');
  res.sendFile(__dirname + '/menu.xlsx', function(err) {
    fs.unlinkSync(__dirname + '/menu.xlsx');
  });
});
