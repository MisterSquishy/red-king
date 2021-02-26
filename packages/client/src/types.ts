import { GameState } from "shared";

export interface DraftGame {
  userName: string;
  gameName: string;
}

export interface Card {
  cardName:
    | "Ace"
    | "Two"
    | "Three"
    | "Four"
    | "Five"
    | "Six"
    | "Seven"
    | "Eight"
    | "Nine"
    | "Ten"
    | "Jack"
    | "Queen"
    | "King"
    | "13"
    | "14";
  suit: "Spades" | "Hearts" | "Diamonds" | "Clubs";
}

export interface Player {
  name: string;
  hand: { cards: Card[] };
}
export interface Game {
  currentPlayer: number;
  deck: { cards: Card[] };
  discardPile: { cards: Card[] };
  gameName: string;
  players: Player[];
  state: GameState;
  _id: string;
}
