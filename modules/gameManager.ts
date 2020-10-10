import { DrawType, Game, Player } from './interfaces';
import { Card, CardName, Deck, Hand, Suit } from 'typedeck';

exports.create = (
  gameId: string,
  playerNames: string[]
): Game => {

  const deck = Deck.Build(
    Object.keys(Suit)
      .filter(key => !isNaN(parseInt(key)))
      .map(key => Suit[key]),
    Object.keys(CardName)
      .filter(key => !isNaN(parseInt(key)))
      .filter(key => +key !== CardName.Joker)
      .map(key => CardName[key])
  )
  
  deck.shuffle()

  const players: Player[] = []
  for (const index in playerNames) {
    const hand: Hand = new Hand()
    deck.deal(hand, 4)
    players.push({ name: playerNames[index], hand, score: 0 })
  }

  return { deck, players, currentPlayer: 0, _id: gameId, discardPile: Deck.Build([], []) }
}

const getShamelessHackDeck = (deflatedGame: Game): Deck => {
  const { deck } = deflatedGame;
  // @ts-ignore
  return Deck.BuildFrom(deck.cards)
}

const getShamelessHackDiscardPile = (deflatedGame: Game): Deck => {
  const { discardPile } = deflatedGame;
  // @ts-ignore
  return Deck.BuildFrom(discardPile.cards)
}

const getShamelessHackHand = (deflatedPlayer: Player): Hand => {
  const { hand } = deflatedPlayer;
  // @ts-ignore
  return new Hand(hand.cards)
}

exports.addPlayer = (
  game: Game,
  playerName: string
): Game => {
  const shamelessHackDeck = getShamelessHackDeck(game);
  const hand: Hand = new Hand();
  shamelessHackDeck.deal(hand, 4);
  game.players.push({ name: playerName, hand, score: 0 });
  return game;
}

exports.drawCard = (
  game: Game,
  playerName: string,
  type: DrawType
): Game => {
  const shamelessHackCards: Deck = type === DrawType.DECK ? getShamelessHackDeck(game) : getShamelessHackDiscardPile(game);
  const player = game.players.find(player => player.name === playerName)
  const shamelessHackHand: Hand = getShamelessHackHand(player);
  const card: Card = shamelessHackCards.takeCard();
  shamelessHackHand.addCard(card);
  player.hand = shamelessHackHand;

  return {
    _id: game._id,
    players: game.players,
    currentPlayer: game.currentPlayer,
    deck: type === DrawType.DECK ? shamelessHackCards : game.deck,
    discardPile: type === DrawType.DECK ? game.discardPile : shamelessHackCards
  };
}

exports.discardCard = (
  game: Game,
  playerName: string,
  card: Card
): Game => {
  const shamelessHackDicardPile: Deck = getShamelessHackDiscardPile(game);
  const player = game.players.find(player => player.name === playerName)
  const shamelessHackHand: Hand = getShamelessHackHand(player);
  shamelessHackHand.removeCards([ card ]);
  shamelessHackDicardPile.addCard(card);
  player.hand = shamelessHackHand;
  
  return {
    _id: game._id,
    players: game.players,
    currentPlayer: (game.currentPlayer + 1) % game.players.length,
    deck: game.deck,
    discardPile: shamelessHackDicardPile
  };
}
