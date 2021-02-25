import { Card, Deck, Hand } from "typedeck";

export enum GameState {
  WAITING,
  IN_PROGRESS,
  FINISHED,
}

export interface Player {
  name: string;
  hand: Hand;
}

export interface Game {
  deck: Deck;
  discardPile: Deck;
  players: Player[];
  currentPlayer: number;
  _id: string;
  frozen?: boolean;
  state: GameState;
  gameName?: string;
  userName?: string;
}
