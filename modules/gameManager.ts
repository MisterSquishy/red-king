import { Game, Player } from './interfaces';
import { CardName, Deck, Hand, Suit } from 'typedeck';

exports.create = (
  gameId: string,
  playerNames: string[]
): Game => {

  const deck = Deck.Build(
    Object.keys(Suit).filter(key => !isNaN(parseInt(key))).map(key => Suit[key]),
    Object.keys(CardName).filter(key => !isNaN(parseInt(key))).map(val => CardName[val])
  )
  
  deck.shuffle()

  const players: Player[] = []
  for (const index in playerNames) {
    const hand: Hand = new Hand()
    deck.deal(hand, 4)
    players.push({ name: playerNames[index], hand, score: 0 })
  }

  return { deck, players, _id: gameId }
}

exports.addPlayer = (
  game: Game,
  playerName: string
): Game => {
  const { deck } = game;
  const hand: Hand = new Hand();
  deck.deal(hand, 4);
  game.players.push({ name: playerName, hand, score: 0 });
  return game;
}
