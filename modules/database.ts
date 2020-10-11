import { Game, GameDeserializer, GameSerializer } from "./interfaces";
require("dotenv").config();

var { MongoClient } = require("mongodb");
var url = `${
  process.env.MONGO_URL || "mongodb://localhost:27017"
}/red-king-games`;

exports.createGame = (game: Game) => {
  const serializedGame = GameSerializer(game);
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("red-king");
    dbo.collection("games").insertOne(serializedGame, (err, res) => {
      if (err) throw err;
      db.close();
    });
  });
};

exports.findGame = (gameId: string, callback: Function) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("red-king");
    dbo.collection("games").findOne({ _id: gameId }, (err, game) => {
      if (err) throw err;
      callback(GameDeserializer(game));
      db.close();
    });
  });
};

exports.updateGame = (game: Game) => {
  const serializedGame = GameSerializer(game);
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("red-king");
    dbo
      .collection("games")
      .replaceOne({ _id: serializedGame._id }, serializedGame, (err, res) => {
        if (err) throw err;
        db.close();
      });
  });
};
