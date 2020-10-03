import { Game } from "./interfaces";
require('dotenv').config();

var { MongoClient } = require('mongodb');
var url = `${process.env.MONGO_URL || 'mongodb://localhost:27017'}/red-king-games`;

exports.createGame = (game: Game): Promise<Game> => {
  return MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("red-king");
    dbo.collection("games").insertOne(game, (err, res) => {
      if (err) throw err;
      db.close();
    });
  });
}

exports.findGame = (gameId: string): Promise<Game> => {
  return MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("red-king");
    const game = dbo.collection("games").find({ _id: gameId });
    db.close();
    return game;
  });
}

exports.updateGame = (game: Game): Promise<Game> => {
  return MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("red-king");
    dbo.collection("games").update({ _id: game._id }, (err, res) => {
      if (err) throw err;
      db.close();
    });
  });
}
