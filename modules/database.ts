import { Game } from "./interfaces";
require('dotenv').config();

var { MongoClient } = require('mongodb');
var url = `${process.env.MONGO_URL || 'mongodb://localhost:27017'}/red-king-games`;

exports.createGame = (game: Game) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("red-king");
    dbo.collection("games").insertOne(game, (err, res) => {
      if (err) throw err;
      db.close();
    });
  });
}

exports.findGame = (gameId: string, callback: Function) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("red-king");
    dbo.collection("games").findOne({ _id: gameId }, (err, res) => {
      if (err) throw err;
      callback(res)
      db.close();
    });
  });
}

exports.updateGame = (game: Game) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("red-king");
    dbo.collection("games").update({ _id: game._id }, game, (err, res) => {
      if (err) throw err;
      db.close();
    });
  });
}
