const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors')

const { create, addPlayer, drawCard, discardCard } = require('./modules/gameManager');
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
    if(game) {
      const updatedGame = addPlayer(game, userName)
      updateGame(updatedGame)
      res.send({ gameId })
    } else {
      res.status(404).send("Game not found")
    }
  })   
});

//draw card
app.post('/games/:gameId/draw', (req, res) => {
  const { gameId } = req.params
  const { userName, type } = req.body
  findGame(gameId, game => {
    if(game) {
      const updatedGame = drawCard(game, userName, type)
      updateGame(updatedGame)
      io.to(gameId).emit('GameUpdate', updatedGame);
      res.send()
    } else {
      res.status(404).send("Game not found")
    }
  })   
});

//discard card
app.post('/games/:gameId/discard', (req, res) => {
  const { gameId } = req.params
  const { userName, card } = req.body
  findGame(gameId, game => {
    if(game) {
      const updatedGame = discardCard(game, userName, card)
      updateGame(updatedGame)
      console.log(updatedGame.discardPile)
      io.to(gameId).emit('GameUpdate', updatedGame);
      res.send()
    } else {
      res.status(404).send("Game not found")
    }
  })   
});

io.on('connection', (socket) => {
  socket.on('join', (gameId) => {
    findGame(gameId, game => {
      console.log(`user connected to ${gameId}`);
      socket.join(gameId);
      io.to(gameId).emit('GameUpdate', game);
    })    
  });
  socket.on('GameUpdate', (gameId, game) => {
    console.log(`pushing update to ${gameId}`)
    io.to(gameId).emit('GameUpdate', game);
  })
  socket.on('StateChange', (gameId, gameState) => {
    console.log(`pushing stateChange (${gameState}) to ${gameId}`)
    io.to(gameId).emit('StateChange', gameState);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
