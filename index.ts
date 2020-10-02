var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/app/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  setInterval(() => {
    socket.emit("TestEvent", new Date());
  }, 1000);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
