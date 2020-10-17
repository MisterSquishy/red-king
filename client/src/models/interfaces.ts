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

export enum DiscardSideEffect {
  LOOK_SWAP,
  BLIND_SWAP,
  LOOK_OTHER,
  LOOK_SELF,
}

export const DiscardSideEffectFriendlyName = {
  [DiscardSideEffect.LOOK_SWAP]: "Look at someone's card and swap",
  [DiscardSideEffect.BLIND_SWAP]: "Blindly swap for someone else's card",
  [DiscardSideEffect.LOOK_OTHER]: "Look at someone's card",
  [DiscardSideEffect.LOOK_SELF]: "Look at your own card",
};
