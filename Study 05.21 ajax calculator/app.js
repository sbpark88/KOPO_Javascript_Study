var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(81);

// 1. AJAX calcForm 연습하기
app.get('/Review1Ajax', function (req, res) {
  res.sendfile("calcForm.html");
});
app.get('/QuerySum', function (req, res) {
  console.log(req.query);
  var num1 = Number(req.query.num1);
  var num2 = Number(req.query.num2);
  res.send(`${num1} + ${num2} = ${num1 + num2}`);
});
app.get('/QuerySubtraction', function (req, res) {
  console.log(req.query);
  var num1 = Number(req.query.num1);
  var num2 = Number(req.query.num2);
  res.send(`${num1} - ${num2} = ${num1 - num2}`);
});
app.get('/QueryMultiply', function (req, res) {
  console.log(req.query);
  var num1 = Number(req.query.num1);
  var num2 = Number(req.query.num2);
  res.send(`${num1} x ${num2} = ${num1 * num2}`);
});
app.get('/QueryDivision', function (req, res) {
  console.log(req.query);
  var num1 = Number(req.query.num1);
  var num2 = Number(req.query.num2);
  res.send(`${num1} ÷ ${num2} = ${num1 / num2}`);
});
app.get('/QueryQuotient', function (req, res) {
  console.log(req.query);
  var num1 = Number(req.query.num1);
  var num2 = Number(req.query.num2);
  res.send(`${num1}을 ${num2}로 나눈 몫은 : ${parseInt(num1 / num2)}`);
});
app.get('/QueryRemainder', function (req, res) {
  console.log(req.query);
  var num1 = Number(req.query.num1);
  var num2 = Number(req.query.num2);
  res.send(`${num1}을 ${num2}로 나눈 나머지는 : ${num1 % num2}`);
});
app.get('/QuerySquare', function (req, res) {
  console.log(req.query);
  var num1 = Number(req.query.num1);
  var num2 = Number(req.query.num2);
  res.send(`${num1}^${num2} = ${Math.pow(num1,num2)}`);
});



// 2. AJAX 가격을 입력 후 구입 확인 버튼을 누르면 구입 가능한 물품 중 가장 비싼
// 물품을 보내준다. 가격이 너무 적으면 구입 불가 라는 메세지를 보내준다.
app.get('/Study1Ajax', function (req, res) {
  res.sendfile("Study1Ajax.html");
});
app.get('/QueryStore', function (req, res) {
  // var money = Number(req.query.money);
  // let priceArray = [1000,5000,10000,30000,50000,100000,500000];
  // var result;
  //
  // var priceLastIndex = priceArray.length - 1;
  // for (var i = priceLastIndex; i >= 0; i--) {
  //   console.log(i, money,  priceArray[i])
  //   if (money >= priceArray[i]) {
  //     result = "item" + String(i+1);
  //     break;
  //   } else {
  //     result = "구입 불가";
  //   }
  // }

  // 리스트 안에 딕셔너리!!!!
  var money = Number(req.query.money);
  var items = [
    {name: "item1", price: 1000},
    {name: "item2", price: 5000},
    {name: "item3", price: 10000},
    {name: "item4", price: 30000},
    {name: "item5", price: 50000},
    {name: "item6", price: 10000},
    {name: "item7", price: 50000},
  ];
  var result = "구입 불가";
  for (var i = 0; i < items.length; i++) {
    var eachItem = items[i];
    if (money > eachItem.price) {
      result = eachItem.name;
    } else {
      break;
    }
  }

  res.send(`${result}`);

});



// 3. 서버에서 현대(1400), 기아(1300), 쌍용(1500), 벤츠(3500), BMW(3200)
// 빨강(100), 파랑(120), 초록(200), 노랑(130), 검정(80)
// 차종, 색상의 합계를 응답으로 전송하여 화면에 가격을 출력하세요.
app.get('/carPrice', function (req, res) {
  res.sendfile("carPrice.html");
});
app.get('/calcCarPrice', function (req, res) {
  // 방법 1. select 박스의 value 값을 넘겨 받기
  // var num1 = Number(req.query.manufac);
  // var num2 = Number(req.query.color);

  // 방법 2. 프론트엔드에는 정보가 없고 백엔드에서 가격 DB를 소유한 상태에서 계산하기
  var manufac = req.query.manufac;
  var color = req.query.color;

  manufacDict = {"현대":1400,"기아":1300,"쌍용":1500,"벤츠":3500,"BMW":3200};
  colorDict = {"빨강":100,"파랑":120,"초록":200,"노랑":130,"검정":80};

  var manufacPrice = manufacDict[manufac];
  var colorPrice = colorDict[color];

  res.send(`${(manufacPrice + colorPrice)} 만원`);
});



// 4. 함수 사용하기.
// 3개의 수를 입력 받아 가장 큰 수 구하기.
app.get('/StudyFunction', function (req, res) {
  res.sendfile("function.html");
});


console.log("server is running...")
