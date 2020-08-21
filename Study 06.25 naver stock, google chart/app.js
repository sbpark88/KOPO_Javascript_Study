var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(80);
console.log("server is running...")


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

// 1. 라우터 없이 서버에서 긁어서 바로 DB에 저장하는 방법.
// const options = {
//   url:'https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:068270|SERVICE_RECENT_ITEM:068270',
//   method: 'GET'
// }
//
// setInterval(function () {
//   request.get(options, function(err,httpResponse,body){
//     // console.log(JSON.parse(httpResponse.body));
//     response = JSON.parse(httpResponse.body);
//     console.log("방법1: " + response["result"]["areas"][0]["datas"][0]["nv"]);
//     console.log("방법2: " + response.result.areas[0].datas[0].nv);
//     var price = response.result.areas[0].datas[0].nv;
//     var unixTimeStamp = response.result.time;
//
//     function timeConverter(UNIX_timestamp){
//       var a = new Date(UNIX_timestamp); // 보통 1000을 곱하라고 되어 있는데 이는 13자리를 맞춰주기 위해 곱하거나 떨구는거. 네이버는 기본으로 13자리를 주어 따로 처리 할 필요가 없다.
//       var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//       var year = a.getFullYear();
//       var month = months[a.getMonth()];
//       var date = a.getDate();
//       var hour = a.getHours();
//       var min = a.getMinutes();
//       var sec = a.getSeconds();
//       var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
//       return time;
//     }
//     var time = timeConverter(unixTimeStamp)
//     console.log(time);  // timeConverter 함수 인풋 파라미터로 유닉스타임스탬프를 넣는다.
//
//
//     // INSERT 쿼리 보내기
//     connection.query(`INSERT INTO celltrion (price, navertime) VALUES('${price}','${time}');`)
//   });
// },1000);

// 2. 라우터 사용 : 네이버 주식 정보 가져와 매 초마다 (1) DB에 저장하고, (2) main.html에 response 보내기 (main.html에서는 DB에서 읽어와 그래프를 그리지 않고 실시간 response를 배열에 누적해서 그래프를 그린다.)
app.get('/', function (req, res) {
  res.sendfile("main.html");
});
app.get('/main', function (req, res) {
  res.sendfile("main.html");
});
app.get('/getNaver', function (req, res) {
  // var price = getPrice();
  // res.send(price);

  const options = {
    url:'https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:035720|SERVICE_RECENT_ITEM:035720',
    method: 'GET'
  }

  request.get(options, function(err,httpResponse,body){
    // console.log(JSON.parse(httpResponse.body));
    response = JSON.parse(httpResponse.body);
    console.log("방법1: " + response["result"]["areas"][0]["datas"][0]["nv"]);
    console.log("방법2: " + response.result.areas[0].datas[0].nv);
    var price = response.result.areas[0].datas[0].nv;
    var unixTimeStamp = response.result.time;

    function timeConverter(UNIX_timestamp){
      var a = new Date(UNIX_timestamp); // 보통 1000을 곱하라고 되어 있는데 이는 13자리를 맞춰주기 위해 곱하거나 떨구는거. 네이버는 기본으로 13자리를 주어 따로 처리 할 필요가 없다.
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      return time;
    }
    var time = timeConverter(unixTimeStamp)
    console.log(time);  // timeConverter 함수 인풋 파라미터로 유닉스타임스탬프를 넣는다.

    // 쿼리 보내기
    connection.query(`INSERT INTO kakao (price, navertime) VALUES('${price}','${time}');`)

    res.send(""+price);   // 숫자만 response로 보낼 경우 23530이라는 값을 response 보내면 HTTP Response 코드로 인식해 응답코드 23530 이라고 낭게 된다. 따라서 문자로 바꿔준다. (2개 이상을 response로 보내 배열로 만들어 보내는 경우는 무관하다.)
  });
});

// const options = {
//   url:'https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:068270|SERVICE_RECENT_ITEM:068270',
//   method: 'GET'
// }

// 함수를 따로 뺐는데 위에 함수 호출한 곳에 return이 되지 않는다. promise 개념이 들어가야한다 함.
// function getPrice() {
//     request.get(options, function(err,httpResponse,body){
//       // console.log(JSON.parse(httpResponse.body));
//       response = JSON.parse(httpResponse.body);
//       console.log("방법1: " + response["result"]["areas"][0]["datas"][0]["nv"]);
//       console.log("방법2: " + response.result.areas[0].datas[0].nv);
//       var price = response.result.areas[0].datas[0].nv;
//       var unixTimeStamp = response.result.time;
//
//       function timeConverter(UNIX_timestamp){
//         var a = new Date(UNIX_timestamp); // 보통 1000을 곱하라고 되어 있는데 이는 13자리를 맞춰주기 위해 곱하거나 떨구는거. 네이버는 기본으로 13자리를 주어 따로 처리 할 필요가 없다.
//         var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//         var year = a.getFullYear();
//         var month = months[a.getMonth()];
//         var date = a.getDate();
//         var hour = a.getHours();
//         var min = a.getMinutes();
//         var sec = a.getSeconds();
//         var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
//         return time;
//       }
//       var time = timeConverter(unixTimeStamp)
//       console.log(time);  // timeConverter 함수 인풋 파라미터로 유닉스타임스탬프를 넣는다.
//
//       // 쿼리 보내기
//       connection.query(`INSERT INTO celltrion (price, navertime) VALUES('${price}','${time}');`)
//       console.log("나나난나"+price);
//       return price;
//     });
// };

// {"resultCode":"success",
// "result":{"pollingInterval":8000,
//           "areas":[
//                   {"datas":[{"ll":223500,"ms":"OPEN","nv":316000,"cd":"068270","eps":2514,"bps":21666.1227,"cnsEps":3770,"ov":315500,"sv":319000,"cv":3000,"nav":null,"aq":531756,"aa":169225844500,"dv":null,"keps":2236,"nm":"��Ʈ����","rf":"5","mt":"1","pcv":319000,"tyn":"N","ul":414500,"lv":314500,"hv":323000,"cr":0.94}],
//                     "name":"SERVICE_ITEM"},
//                   {"datas":[{"ll":223500,"ms":"OPEN","nv":316000,"cd":"068270","eps":2514,"bps":21666.1227,"cnsEps":3770,"ov":315500,"sv":319000,"cv":3000,"nav":null,"aq":531756,"aa":169225844500,"dv":null,"keps":2236,"nm":"��Ʈ����","rf":"5","mt":"1","pcv":319000,"tyn":"N","ul":414500,"lv":314500,"hv":323000,"cr":0.94}],
//                     "name":"SERVICE_RECENT_ITEM"}],
// "time":1593051026214}}


// 3. 버튼을 누르면 내부망 서버에 접속해 받아온 response로 각각의 그래프를 갱신하라.
app.get('/main2', function (req, res) {
  res.sendfile("main2.html");
});

app.get('/findprice', function (req, res) {
  var priceUrl = req.query.priceUrl;

  const options = {
    url: `${priceUrl}`,
    method: 'GET'
  }

  request.get(options, function(err,httpResponse,body){
    console.log(JSON.parse(httpResponse.body));
    response = JSON.parse(httpResponse.body);

    res.send(response);
  });
});
