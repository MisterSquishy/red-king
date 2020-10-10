export interface Game {
  _id: string
  players: Player[]
  currentPlayer?: Player
}

export enum GameState {
  WAITING,
  IN_PROGRESS,
  FINISHED
}

export enum DrawType {
  DECK,
  DISCARD
}

export interface Player {
  name: string
  hand: Hand
  score: number
}

export interface Hand {
  cards: Card[]
}

export interface Card {
  cardName: string
  suit: string
}
