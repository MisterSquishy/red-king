import { Game, GameDeserializer, GameSerializer } from "./interfaces";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const url = `${
  process.env.MONGO_URL || "mongodb://localhost:27017"
}/red-king-games`;

export default {
  createGame: (game: Game) => {
    const serializedGame = GameSerializer(game);
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("red-king");
      dbo.collection("games").insertOne(serializedGame, (err, res) => {
        db.close();
        if (err) throw err;
      });
    });
  },

  findGame: (gameId: string, callback: Function) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("red-king");
      dbo.collection("games").findOne({ _id: gameId }, (err, game) => {
        db.close();
        if (err) throw err;
        else if (!game) callback(null);
        else callback(GameDeserializer(game));
      });
    });
  },

  updateGame: (game: Game) => {
    if (game.frozen) {
      return;
    }
    const serializedGame = GameSerializer(game);
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("red-king");
      dbo
        .collection("games")
        .replaceOne({ _id: serializedGame._id }, serializedGame, (err, res) => {
          db.close();
          if (err) throw err;
        });
    });
  },
};
