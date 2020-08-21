var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(80);
console.log("시스템 가동! 준비완료!")

var mysql = require('mysql');
//npm install mysql
// var server = http.createServer(app).listen(8);
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3308,
  user:'root',
  password: '1234',
  database: 'javascript'
});

app.get('/aircraftPage', function(req, res) {
  res.sendfile("aircraft.html")
});

app.get('/aircraftPostPage', function(req, res) {
  res.sendfile("aircraftPost.html")
});

app.get('/flightPostPage', function(req, res) {
  res.sendfile("flightPost.html")
});

// mainPage
app.get('/aircraft', function(req, res) {

  connection.query('select * from aircraft a, flight b where a.aircraft.',
    function(err, rows, fields) {
      if (err) throw err;


    })
});
// app.get('/aircraft', function(req, res) {
//
//   connection.query('select * from aircraft',
//     function(err, rows, fields) {
//       if (err) throw err;
//
//       connection.query('select * from flight',
//         function(err, rows, fields) {
//           if (err) throw err;
//
//           res.send(rows);
//         })
//     })
// });

// 필요 없을 것 같음 지금은...
app.get('/flightName', function(req, res) {
  var no = req.query.no;

  connection.query(`select * from aircraft where no = ${no}`,
    function(err, rows, fields) {

      if (err) throw err;
      //쿼리 결과 가져오기
      for (var i = 0; i < rows.length; i++)
        // var data = rows[i]
      res.send(rows);
    })
});


// ▽ 얘 필요.
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false
}));
app.use(bodyParser.json({
  limit: '50mb'
}));

// aircraft Insert
app.post('/aircraftPost', function(req, res) {
  // var no = req.body.no;
  var aircraftCode = req.body.aircraftCode;
  var aircraftName = req.body.aircraftName;
  var seats = req.body.seats;
  console.log(aircraftCode, aircraftName, seats)
  var insertQuery = `insert into aircraft (aircraftCode, aircraftName, seats) values("${aircraftCode}","${aircraftName}","${seats}")`;
  connection.query(insertQuery,
    function(err, rows, fields) {
      if (err) throw err;
      for (let i = 0; i < rows.length; i++)
        console.log(rows[i].no, rows[i].name);
      res.send(rows);

    })
});

// flight Insert
app.post('/flightPost', function(req, res) {
  // var no = req.body.no;
  var flightName = req.body.flightName;
  var aircraftCode = req.body.aircraftCode;
  var departure = req.body.departure;
  var arrival = req.body.arrival;
  var departTime = req.body.departTime;
  var arriveTime = req.body.arriveTime;
  console.log(flightName, aircraftCode, departure, arrival, departTime, arriveTime)
  var insertQuery = `insert into flight (flightName, aircraftCode, departure, arrival, departTime,arriveTime) values("${flightName}","${aircraftCode}","${departure}","${arrival}","${departTime}","${arriveTime}")`;
  connection.query(insertQuery,
    function(err, rows, fields) {
      if (err) throw err;
      for (let i = 0; i < rows.length; i++)
        console.log(rows[i].no, rows[i].name);
      res.send(rows);

    })
});
