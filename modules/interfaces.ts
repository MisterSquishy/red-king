import { Deck, Hand } from 'typedeck';

export interface Player {
  name: string
  hand: Hand
  score: number
}

export interface Game {
  deck: Deck
  players: Player[]
  _id: string
}