import { io, logger } from "../index";
import gameManager from "./gameManager";
import database from "./database";

export default {
  createUser: (req, res) => {
    const { userName } = req.body;
    // todo persist
    res.send({ userName });
    logger.info({ userName }, "created_user");
  },

  createGame: (req, res) => {
    const { userName } = req.body;
    const gameId = Math.random().toString(36).substr(2, 5);
    const game = gameManager.create(gameId, [userName]);
    database.createGame(game);
    res.send({ gameId });
    logger.info({ gameId, game, userName }, "created_game");
  },

  joinGame: (req, res) => {
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
  },

  drawCard: (req, res) => {
    const { gameId } = req.params;
    const { userName, type } = req.body;
    database.findGame(gameId, (game) => {
      if (game) {
        const { game: updatedGame, card } = gameManager.drawCard(
          game,
          userName,
          type
        );
        database.updateGame(updatedGame);
        io.to(gameId).emit("GameUpdate", updatedGame);
        res.send(card);
        logger.info(
          { gameId, game, updatedGame, userName, type },
          "card_drawn"
        );
      } else {
        res.status(404).send("Game not found");
      }
    });
  },

  discardCard: (req, res) => {
    const { gameId } = req.params;
    const { userName, drawnCard, card } = req.body;
    database.findGame(gameId, (game) => {
      if (game) {
        const updatedGame = gameManager.discardCard(
          game,
          userName,
          drawnCard,
          card
        );
        if (!updatedGame) return;
        database.updateGame(updatedGame);
        io.to(gameId).emit("GameUpdate", updatedGame);
        res.send();
        logger.info(
          { gameId, game, updatedGame, card, userName },
          "card_discarded"
        );
      } else {
        res.status(404).send("Game not found");
      }
    });
  },

  endTurn: (req, res) => {
    const { gameId } = req.params;
    const { userName } = req.body;
    database.findGame(gameId, (game) => {
      if (game) {
        const updatedGame = gameManager.endTurn(game);
        database.updateGame(updatedGame);
        io.to(gameId).emit("GameUpdate", updatedGame);
        res.send();
        logger.info({ gameId, game, updatedGame, userName }, "turn_ended");
      } else {
        res.status(404).send("Game not found");
      }
    });
  },

  onSocketConnection: (socket) => {
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
  },
};
