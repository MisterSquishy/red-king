import { Game, Player } from './interfaces';
import { CardName, Deck, Hand, Suit } from 'typedeck';

exports.start = (
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

  return { deck, players }
}
