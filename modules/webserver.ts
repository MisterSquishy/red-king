import { io, logger } from "../index";
const gameManager = require("./gameManager");
const database = require("./database");

exports.createUser = (req, res) => {
  const { userName } = req.body;
  // todo persist
  res.send({ userName });
  logger.info({ userName }, "created_user");
};

exports.createGame = (req, res) => {
  const { userName } = req.body;
  const gameId = Math.random().toString(36).substr(2, 5);
  const game = gameManager.create(gameId, [userName]);
  database.createGame(game);
  res.send({ gameId });
  logger.info({ gameId, game, userName }, "created_game");
};

exports.joinGame = (req, res) => {
  const { gameId } = req.params;
  const { userName } = req.body;
  database.findGame(gameId, (game) => {
    if (game) {
      const updatedGame = gameManager.addPlayer(game, userName);
      database.updateGame(updatedGame);
      res.send({ gameId });
      logger.info({ gameId, game, updatedGame, userName }, "joined_game");
    } else {
      res.status(404).send("Game not found");
    }
  });
};

exports.drawCard = (req, res) => {
  const { gameId } = req.params;
  const { userName, type } = req.body;
  database.findGame(gameId, (game) => {
    if (game) {
      const updatedGame = gameManager.drawCard(game, userName, type);
      database.updateGame(updatedGame);
      io.to(gameId).emit("GameUpdate", updatedGame);
      res.send();
      logger.info({ gameId, game, updatedGame }, "card_drawn");
    } else {
      res.status(404).send("Game not found");
    }
  });
};

exports.discardCard = (req, res) => {
  const { gameId } = req.params;
  const { userName, card } = req.body;
  database.findGame(gameId, (game) => {
    if (game) {
      const updatedGame = gameManager.discardCard(game, userName, card);
      database.updateGame(updatedGame);
      io.to(gameId).emit("GameUpdate", updatedGame);
      res.send();
      logger.info({ gameId, game, updatedGame, card }, "card_discarded");
    } else {
      res.status(404).send("Game not found");
    }
  });
};

exports.onSocketConnection = (socket) => {
  logger.info({ socketId: socket.id }, "socket_connected");
  socket.on("join", (gameId) => {
    logger.info({ socketId: socket.id, gameId }, "joined_game");
    database.findGame(gameId, (game) => {
      socket.join(gameId);
      io.to(gameId).emit("GameUpdate", game);
    });
  });
  socket.on("StateChange", (gameId, gameState) => {
    logger.info(
      { socketId: socket.id, gameId, gameState },
      "changed_game_state"
    );
    io.to(gameId).emit("StateChange", gameState);
  });
  socket.on("disconnect", () => {
    logger.info({ socketId: socket.id }, "socket_disconnected");
  });
};