export interface Game {
  _id: string
  players: Player[]
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
