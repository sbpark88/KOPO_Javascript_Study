var express = require('express');
var app = express();
app.use(express.static('/Volumes/SB Thunderbolt SSD/Developer/Javascript_Study/study_10.08_chat' + '/'));
var http = require('http').createServer(app);
var io = require('socket.io')(http);  // 서버에서 소켓을 사용하겠다 하고 클라이언트(chatroom.html에도 <script src="/socket.io/socket.io.js"></script>를 넣는다.
http.listen(3000, () => {
  console.log('listening on *:3000');
});

console.log("Server is running...");

app.get('/', (req, res) => {
  // res.send('<h1>Hello world</h1>');
  // res.sendfile("index.html");
  res.sendfile("chatroom.html");
});

app.get('/main', (req, res) => {
  res.sendfile("chatroom.html");
});

// 소켓 입장시 메세지?
io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});

// arrow function! 기존의 function(socekt) {Statement} 와 같다.
// 뭐 굳이 따지고 들어가면 this.ㅇㅇㅇ 의 사용에서 차이가 있다고는 하는데 아직 모르겠다.
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {  // (2. 클라이언트 -> 서버) 'chat message'소켓이 msg라는 변수로 받는다.
    io.emit('chat message', msg);   // (3. 서버 -> 클라이언트) 'chat message'소켓에 msg를 담아 보낸다.
  });
});

// io.on('connection', (socket) => {
//   socket.join('')
// });

// socket.on('joinRoom2', (roomName, name) => {
// socket.join(roomName, () => {
// console.log(name + ' join a ' + roomName);
// //roomNameG = roomName;
// socket.to(roomName).emit('joinRoom2', roomName, name);
// });
// });

// 서버에서 로그인 아이디를 받아 입장 처리
io.on('connection', (socket) => {
  socket.on('joinChatRoom', (loginId) => {
    console.log(loginId);
  })
})
