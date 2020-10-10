import { Deck, Hand } from 'typedeck';

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
