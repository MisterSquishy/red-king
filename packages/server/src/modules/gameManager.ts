import { Game, Player } from "./interfaces";
import { DrawType, GameState } from "shared";
import { Card, CardName, Deck, Hand, JokerCard, Suit } from "typedeck";

export default {
  create: (gameId: string, playerNames: string[], gameName: string): Game => {
    const deck = Deck.Build(
      Object.keys(Suit)
        .filter((key) => !isNaN(parseInt(key)))
        .map((key) => Suit[key]),
      Object.keys(CardName)
        .filter((key) => !isNaN(parseInt(key)))
        .filter((key) => +key !== CardName.Joker)
        .map((key) => CardName[key]),
      [new JokerCard(13), new JokerCard(14)]
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
      state: GameState.WAITING,
      gameName,
    };
  },

  addPlayer: (game: Game, playerName: string) => {
    const { deck, players } = game;
    if (players.find((player) => player.name === playerName)) {
      throw new Error("player with this name already exists");
    }
    const hand: Hand = new Hand();
    deck.deal(hand, 4);
    game.players.push({ name: playerName, hand });
    return game;
  },

  drawCard: (game: Game, playerName: string, type: DrawType) => {
    const cards: Deck = type === DrawType.DECK ? game.deck : game.discardPile;
    const player = game.players.find((player) => player.name === playerName);
    const card: Card = cards.takeCard();
    if (!player) return { game, card };
    const { hand } = player;
    hand.addCardsToBottom([card]);
    return { game, card };
  },

  discardCard: (
    game: Game,
    playerName: string,
    drawnCard: Card,
    card: Card
  ) => {
    const { discardPile } = game;
    const player = game.players.find((player) => player.name === playerName);
    if (!player) return;
    const { hand } = player;
    const indexToDiscard = hand.indexOfCard(card);
    const indexOfDrawn = hand.indexOfCard(drawnCard);
    const cards = hand.getCards();
    cards[indexToDiscard] = drawnCard;
    cards.splice(indexOfDrawn, 1);
    discardPile.addCard(card);

    return game;
  },

  endTurn: (game: Game) => {
    game.currentPlayer = (game.currentPlayer + 1) % game.players.length;
    return game;
  },
};
