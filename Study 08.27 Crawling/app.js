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

// app.get('/getMenu', function (req, res) {
//   request("http://www.kopo.ac.kr/kangseo/content.do?menu=262", function(err, res2, body) {
//     const $ = cheerio.load(body);
//     var menus = [];
//
//     for(var i = 0; i < 5; i++) {
//       menus.push($('td')[i*4+2].children[1].children[0].data.replace(/\n/g, "").split(","));
//     }
//     // console.log(menus);
//
//     res.send(menus);
//   })
// })

app.get('/getMenu', function (req, res) {
  const options = {
    url:'http://www.kopo.ac.kr/kangseo/content.do?menu=262',
    method: 'GET'
  }
  request.get(options, function(err,httpResponse,body){
    const $ = cheerio.load(body);
    var menus = [];

    for(var i = 0; i < 5; i++) {
      menus.push($('td')[i*4+2].children[1].children[0].data.replace(/\n/g, "").split(","));
    }

    res.send(menus);
  });
})

// ajax로 데이터 넘겨받아 엑셀형식으로 만들기
app.post('/getExcel', async function (req, res) {
  var menus = req.body.menus;
  var scores = req.body.scores;

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('menu');

  const alpahbet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  const dayOfTheWeek = ['월','화','수','목','금','토','일'];
  var menusMaxLength = 0;
  var roundedAverage = [];

  // 월, 화, 수, 목, 금을 도는 for문
  for (var i = 0; i < menus.length; i++) {
    // console.log(`${alpahbet[i*2]}1 = ${dayOfTheWeek[i]}`);
    sheet.getCell(`${alpahbet[i*2]}1`).value = dayOfTheWeek[i]; // 1행에 월, 화, 수, 목, 금
    scores[i] = scores[i].map( str => parseInt(str) );  // str to integer (점수 array 형변환)

    // 각 요일별 메뉴의 개수만큼 도는 for문 (각 요일의 메뉴와 메뉴별 점수를 엑셀에 삽입한다.)
    for (var j = 0; j < menus[i].length; j++) {
        // console.log(`${alpahbet[i*2]}${j+2} = ${menus[i][j].trim()}`);
        // console.log(`${alpahbet[i*2+1]}${j+2} = ${scores[i][j]}`);
        sheet.getCell(`${alpahbet[i*2]}${j+2}`).value = menus[i][j].trim();
        sheet.getCell(`${alpahbet[i*2+1]}${j+2}`).value = scores[i][j];
    }
    // 각 요일별 메뉴의 평균 점수를 계산하고, 이를 배열에 담아둔다.
    // reduce 참고 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    // acc : 누적값, (,0 : 초기값), curr : 현재값... 그러니까 파이썬 식으로 표현하면 sum = sum + curr 이런거다.
    const sum = scores[i].reduce( ( accumulator, currentValue ) => accumulator + currentValue, 0);
    const average = sum / menus[i].length;
    roundedAverage[i] = ( Math.round(average*10) ) / 10; // 소수점 첫째 자리까지 표현

    // 메뉴의 길이 중 최대로 긴 값의 크기를 구해서 저장한다. (요일마다 메뉴의 길이가 다를 수 있으니까.)
    // console.log(`${alpahbet[i*2]}${menus[i].length+3} = 평균`);
    if (menus[i].length > menusMaxLength) menusMaxLength = menus[i].length;
  }

  // 요일마다 메뉴의 길이가 다른 경우가 있기 때문에 위에서 메뉴를 모두 채우는 동안 배열에 저장해둔 다음 한 번에 출력한다.
  for (var i = 0; i < menus.length; i++) {
  sheet.getCell(`${alpahbet[i*2]}${menusMaxLength+3}`).value = '평균';
  sheet.getCell(`${alpahbet[i*2+1]}${menusMaxLength+3}`).value = roundedAverage[i];  // 계산한 평균을 입력
  }

  // await : 파일이 다 만들어 질 때까지 기다려준다. (callback 함수와 같은 기능. 최근에 생겨난 함수다.)
  await workbook.xlsx.writeFile('menu.xlsx');
  // 엑셀 다 만들었다고 클라이언트에 응답을 보냄.
  res.send("ok");
});

// 위에서 파일 만들기가 완료되었다는 응답이 가면 ajax가 이쪽 라우터로 이동시켜준다.
app.get('/getExcelFile', function (req, res) {
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader("Content-Disposition", "attachment; filename=menu.xlsx");

  var fs = require('fs');
  // 콜백함수
  res.sendFile(__dirname + '/menu.xlsx', function(err) {  // 파일 보내기가 완료 되면
    fs.unlinkSync(__dirname + '/menu.xlsx');  // 파일을 삭제해라.
  });
});
