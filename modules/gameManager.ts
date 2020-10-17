import { DrawType, Game, Player } from "./interfaces";
import { Card, CardName, Deck, Hand, PlayingCard, Suit } from "typedeck";

exports.create = (gameId: string, playerNames: string[]): Game => {
  const deck = Deck.Build(
    Object.keys(Suit)
      .filter((key) => !isNaN(parseInt(key)))
      .map((key) => Suit[key]),
    Object.keys(CardName)
      .filter((key) => !isNaN(parseInt(key)))
      .filter((key) => +key !== CardName.Joker)
      .map((key) => CardName[key])
  );

  deck.shuffle();

  const players: Player[] = [];
  for (const index in playerNames) {
    const hand: Hand = new Hand();
    deck.deal(hand, 4);
    players.push({ name: playerNames[index], hand });
  }

  return {
    deck,
    players,
    currentPlayer: 0,
    _id: gameId,
    discardPile: Deck.Build([], []),
  };
};

exports.addPlayer = (game: Game, playerName: string): Game => {
  const { deck } = game;
  const hand: Hand = new Hand();
  deck.deal(hand, 4);
  game.players.push({ name: playerName, hand });
  return game;
};

exports.drawCard = (
  game: Game,
  playerName: string,
  type: DrawType
): { game: Game; card: Card } => {
  const cards: Deck = type === DrawType.DECK ? game.deck : game.discardPile;
  const player = game.players.find((player) => player.name === playerName);
  const { hand } = player;
  const card: Card = cards.takeCard();
  hand.addCard(card);

  return { game, card };
};

exports.discardCard = (game: Game, playerName: string, card: Card): Game => {
  const { discardPile } = game;
  const player = game.players.find((player) => player.name === playerName);
  const { hand } = player;
  hand.removeCards([card]);
  discardPile.addCard(card);
  game.currentPlayer = (game.currentPlayer + 1) % game.players.length;

  return game;
};
