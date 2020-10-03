const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { start } = require('./modules/gameManager'); 

io.on('connection', (socket) => {
  console.log('a user connected');
  setTimeout(() => {
    socket.emit("StartGame", start(["petey", "julie"]));
  }, 1000);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
