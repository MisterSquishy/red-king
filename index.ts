const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors')
const { start } = require('./modules/gameManager');

app.use(cors())
app.use(express.json())

app.post('/users', (req, res) => {
  const { userName } = req.body
  // todo persist
  res.send({ userName });
});

app.post('/rooms', (req, res) => {
  const roomId = 'test';
  // todo persist
  res.send({ roomId });
});

app.post('/rooms/:roomId', (req, res) => {
  const { roomId } = req.params
  // todo persist
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
