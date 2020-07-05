var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(81);
console.log("server is running...")

var mysql = require('mysql');
// npm install mysql

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3308,
  user:'root',
  password: '1234',
  database: 'javascript'
});


// 1. 서버 접속시 쿼리 실행해서 DB에서 데이터 읽어오기.
app.get('/selectFromServer', function (req, res) {
  // 콜백 함수
  connection.query('select * from test',
    function (err, rows, fields) {

      if (err) throw err;
      // 쿼리 결과 가져온거
      for (var i = 0; i < rows.length; i++) {
        var data = rows[i];
        console.log(data.no, data.name);
      }
      res.send(rows);
    }
  );
});

// 2. update 하는 라우터를 만들고 번호, 이름을 쿼리스트링으로 받아서 수정.
app.get('/query', function (req, res) {
  res.sendfile("dbquery.html");
});

app.get('/updateFromServer', function (req, res) {
  console.log(req.query);
  var data1 = String(req.query.data1);
  var data2 = Number(req.query.data2);

  connection.query(`update test set name='${data1}' where (no) = '${data2}'`,
  // update test.test  set name='ddd' where (no) >= 1020;
    function (err, rows, fields) {

      if (err) throw err;
      // 쿼리 결과 가져온거
      connection.query(`select * from test where (no) = '${data2}'`,
        function (err, rows, fields) {

          if (err) throw err;
          // 쿼리 결과 가져온거
          for (var i = 0; i < rows.length; i++) {
            var data = rows[i];
            console.log(data.no, data.name);
          }
          res.send(rows);
        }
      );
    }
  );
});

// 라우터 없이 하는 경우
// app.get('/updateFromServer', function (req, res) {
//   connection.query('update test set name="dddd" where (no) >= 1020',
//   // update test.test  set name='ddd' where (no) >= 1020;
//     function (err, rows, fields) {
//
//       if (err) throw err;
//       // 쿼리 결과 가져온거
//
//       // 얘는 update 쿼리 안에 들어가야한다. update 쿼리 뒤에 select 쿼리가 올 경우 누가 먼저 response가 오고 실행될지 모른다. (콜백함수라서)
//       connection.query('select * from test',
//         function (err, rows, fields) {
//
//           if (err) throw err;
//           // 쿼리 결과 가져온거
//           for (var i = 0; i < rows.length; i++) {
//             var data = rows[i];
//             console.log(data.no, data.name);
//           }
//           res.send(rows);
//         }
//       );
//     }
//   );
// });

// // 3. news 테이블 생성, no, title, content 컬럼 생성
// // /newsListPage 라우터로 접속 -> newsList.html 파일 응답으로 전송
// // 전송 후 브라우저에서 페이지가 로드되면 ajax로 뉴스테이블의 모든 데이터를 읽어와서 제목, 내용만 화면에 출력.
// // Main
// app.get('/newsListPage', function (req, res) {
//   res.sendfile("newsList.html");
// });
// // C insert
// app.get('/insertNewsFromServer', function (req, res) {
//   console.log(req.query);
//   var q_no = Number(req.query.q_no);
//   var q_title = String(req.query.q_title);
//   var q_content = String(req.query.q_content);
//
//   connection.query(`insert into news (no, title, content) values('${q_no}', '${q_title}','${q_content}')`,
//     function (err, rows, fields) {
//       if (err) throw err;
//       // 쿼리 결과 가져온거
//       connection.query(`select * from news`,
//         function (err, rows, fields) {
//
//           if (err) throw err;
//           // 쿼리 결과 가져온거
//           for (var i = 0; i < rows.length; i++) {
//             var data = rows[i];
//             console.log(data.no, data.title, data.content);
//           }
//           res.send(rows);
//         }
//       );
//     }
//   );
// });
// // R select
// app.get('/selectNewsFromServer', function (req, res) {
//   console.log(req.query);
//   var q_no = Number(req.query.q_no);
//   var q_title = String(req.query.q_title);
//   var q_content = String(req.query.q_content);
//
//   connection.query('select * from news',
//   // connection.query(`select * from news where no='${q_no}'`,
//     function (err, rows, fields) {
//       if (err) throw err;
//       // 쿼리 결과 가져온거
//       for (var i = 0; i < rows.length; i++) {
//         var data = rows[i];
//         console.log(data.no, data.title, data.content);
//       }
//       res.send(rows);
//     }
//   );
// });
// // U update
// app.get('/updateNewsFromServer', function (req, res) {
//   console.log(req.query);
//   var q_no = Number(req.query.q_no);
//   var q_title = String(req.query.q_title);
//   var q_content = String(req.query.q_content);
//
//   connection.query(`update news set title='${q_title}', content='${q_content}' where no='${q_no}'`,
//     function (err, rows, fields) {
//       if (err) throw err;
//       // 쿼리 결과 가져온거
//       connection.query(`select * from news`,
//         function (err, rows, fields) {
//
//           if (err) throw err;
//           // 쿼리 결과 가져온거
//           for (var i = 0; i < rows.length; i++) {
//             var data = rows[i];
//             console.log(data.no, data.title, data.content);
//           }
//           res.send(rows);
//         }
//       );
//     }
//   );
// });
// // D delete
// app.get('/deleteNewsFromServer', function (req, res) {
//   console.log(req.query);
//   var q_no = Number(req.query.q_no);
//   var q_title = String(req.query.q_title);
//   var q_content = String(req.query.q_content);
//
//   connection.query(`delete from news where no='${q_no}'`,
//     function (err, rows, fields) {
//       if (err) throw err;
//       // 쿼리 결과 가져온거
//       connection.query(`select * from news`,
//         function (err, rows, fields) {
//
//           if (err) throw err;
//           // 쿼리 결과 가져온거
//           for (var i = 0; i < rows.length; i++) {
//             var data = rows[i];
//             console.log(data.no, data.title, data.content);
//           }
//           res.send(rows);
//         }
//       );
//     }
//   );
// });

// 4. 위에 3번을 POST 방식으로
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb'}));

// Main
app.get('/newsListPost', function (req, res) {
  res.sendfile("newsListPost.html");
});
// C insert
app.post('/insertNewsFromServer', function (req, res) {
  console.log(req.body);
  var q_no = Number(req.body.q_no);
  var q_title = String(req.body.q_title);
  var q_content = String(req.body.q_content);
  connection.query(`insert into news (no, title, content) values('${q_no}', '${q_title}','${q_content}')`,
    function (err, rows, fields) {
      if (err) throw err;
      connection.query(`select * from news`,
        function (err, rows, fields) {
          if (err) throw err;

          for (var i = 0; i < rows.length; i++) {
            var data = rows[i];
            console.log(data.no, data.title, data.content);
          }
          res.send(rows);
        }
      );
    }
  );
});
// R select
app.post('/selectNewsFromServer', function (req, res) {
  console.log(req.body);
  var q_no = Number(req.body.q_no);
  var q_title = String(req.body.q_title);
  var q_content = String(req.body.q_content);

  connection.query('select * from news',
    function (err, rows, fields) {
      if (err) throw err;

      for (var i = 0; i < rows.length; i++) {
        var data = rows[i];
        console.log(data.no, data.title, data.content);
      }
      res.send(rows);
    }
  );
});
// U update
app.post('/updateNewsFromServer', function (req, res) {
  console.log(req.body);
  var q_no = Number(req.body.q_no);
  var q_title = String(req.body.q_title);
  var q_content = String(req.body.q_content);
  connection.query(`update news set title='${q_title}', content='${q_content}' where no='${q_no}'`,
    function (err, rows, fields) {
      if (err) throw err;

      connection.query(`select * from news`,
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
    }
  );
});
// D delete
app.post('/deleteNewsFromServer', function (req, res) {
  console.log(req.body);
  var q_no = Number(req.body.q_no);
  var q_title = String(req.body.q_title);
  var q_content = String(req.body.q_content);

  connection.query(`delete from news where no='${q_no}'`,
    function (err, rows, fields) {
      if (err) throw err;
      connection.query(`select * from news`,
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
    }
  );
});
