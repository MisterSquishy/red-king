const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors')
const pino = require('pino');
const expressPino = require('express-pino-logger');
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

const { create, addPlayer, drawCard, discardCard } = require('./modules/gameManager');
const { createGame, updateGame, findGame } = require('./modules/database');

app.use(cors())
app.use(express.json())
app.use(expressLogger);

//create user
app.post('/users', (req, res) => {
  const { userName } = req.body
  // todo persist
  res.send({ userName });
  logger.info({ userName }, 'created_user');
});

//create game
app.post('/games', (req, res) => {
  const { userName } = req.body;
  const gameId = Math.random().toString(36).substr(2, 5);
  const game = create(gameId, [ userName ]);
  createGame(game);
  res.send({ gameId });
  logger.info({ gameId, game, userName }, 'created_game');
});

//join game
app.post('/games/:gameId', (req, res) => {
  const { gameId } = req.params
  const { userName } = req.body
  findGame(gameId, game => {
    if(game) {
      const updatedGame = addPlayer(game, userName);
      updateGame(updatedGame);
      res.send({ gameId });
      logger.info({ gameId, game, updatedGame, userName }, 'joined_game');
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
      const updatedGame = drawCard(game, userName, type);
      updateGame(updatedGame);
      io.to(gameId).emit('GameUpdate', updatedGame);
      res.send();
      logger.info({ gameId, game, updatedGame }, 'card_drawn');
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
      const updatedGame = discardCard(game, userName, card);
      updateGame(updatedGame);
      io.to(gameId).emit('GameUpdate', updatedGame);
      res.send();
      logger.info({ gameId, game, updatedGame, card }, 'card_discarded');
    } else {
      res.status(404).send("Game not found")
    }
  })   
});

io.on('connection', (socket) => {
  logger.info({ socketId: socket.id }, 'connected');
  socket.on('join', (gameId) => {
    logger.info({ socketId: socket.id, gameId }, 'joined_game');
    findGame(gameId, game => {
      socket.join(gameId);
      io.to(gameId).emit('GameUpdate', game);
    })    
  });
  socket.on('StateChange', (gameId, gameState) => {
    logger.info({ socketId: socket.id, gameId, gameState }, 'changed_game_state');
    io.to(gameId).emit('StateChange', gameState);
  });
  socket.on('disconnect', () => {
    logger.info({ socketId: socket.id }, 'disconnected');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  logger.info({ PORT }, 'started server');
});
