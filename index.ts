const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors')

const { create, addPlayer } = require('./modules/gameManager');
const { createGame, updateGame, findGame } = require('./modules/database');

app.use(cors())
app.use(express.json())

//create user
app.post('/users', (req, res) => {
  const { userName } = req.body
  // todo persist
  res.send({ userName });
});

//create game
app.post('/games', (req, res) => {
  const { userName } = req.body
  const gameId = Math.random().toString(36).substr(2, 5);
  const game = create(gameId, [ userName ])
  createGame(game)
  res.send({ gameId })
});

//join game
app.post('/games/:gameId', (req, res) => {
  const { gameId } = req.params
  const { userName } = req.body
  findGame(gameId, game => {
    const updatedGame = addPlayer(game, userName)
    updateGame(updatedGame)
    res.send({ gameId })
  })   
});

io.on('connection', (socket) => {
  socket.on('join', function(gameId) {
    findGame(gameId, game => {
      socket.join(gameId);
      io.to(gameId).emit('GameUpdate', game);
    })    
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
