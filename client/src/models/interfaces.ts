import { PlayingCard } from "typedeck";

export interface Game {
  _id: string;
  players: Player[];
  currentPlayer: number;
  deck: { cards: PlayingCard[] };
  discardPile: { cards: PlayingCard[] };
}

export enum GameState {
  WAITING,
  IN_PROGRESS,
  FINISHED,
}

export enum DrawType {
  DECK,
  DISCARD,
}

export interface Player {
  name: string;
  hand: Hand;
}

export interface Hand {
  cards: PlayingCard[];
}
