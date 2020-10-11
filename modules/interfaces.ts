import { Card, Deck, Hand } from 'typedeck';

export interface Player {
  name: string
  hand: Hand
  score: number
}

export interface Game {
  deck: Deck
  discardPile: Deck
  players: Player[]
  currentPlayer: number
  _id: string
}

export enum DrawType {
  DECK,
  DISCARD
}

interface SerializedGame {
  deck: Card[]
  discardPile: Card[]
  players: SerializedPlayer[]
  currentPlayer: number
  _id: string
}

interface SerializedPlayer {
  name: string
  score: number
  hand: Card[]
}

export const GameSerializer = (game: Game): SerializedGame => {
  return {
    _id: game._id,
    players: game.players.map(player => {
      return {
        name: player.name,
        score: player.score,
        hand: player.hand.getCards()
      }
    }),
    currentPlayer: game.currentPlayer,
    deck: game.deck.getCards(),
    discardPile: game.discardPile.getCards()
  }
}

export const GameDeserializer = (serializedGame: SerializedGame): Game => {
  return {
    _id: serializedGame._id,
    players: serializedGame.players.map(player => {
      return {
        name: player.name,
        score: player.score,
        hand: new Hand(player.hand)
      }
    }),
    currentPlayer: serializedGame.currentPlayer,
    deck: Deck.BuildFrom(serializedGame.deck),
    discardPile: Deck.BuildFrom(serializedGame.discardPile)
  }
}
