const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors')
const { start } = require('./modules/gameManager');

app.use(cors())

app.post('/rooms', (req, res) => {
  const roomId = 'test';
  res.send({ roomId });
});

app.post('/rooms/:roomId', (req, res) => {
  const { roomId } = req.params
  res.send({ roomId });
});

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
