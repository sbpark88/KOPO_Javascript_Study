var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
http.listen(3000, () => {
  console.log('listening on *:3000');
});

console.log("Server is running...");

app.get('/', (req, res) => {
  // res.send('<h1>Hello world</h1>');
  // res.sendfile("index.html");
  res.sendfile("chatroom.html");
});

// 소켓 입장시 메세지?
io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});

// arrow function! 기존의 function(socekt) {Statement} 와 같다.
// 뭐 굳이 따지고 들어가면 this.ㅇㅇㅇ 의 사용에서 차이가 있다고는 하는데 아직 모르겠다.
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
