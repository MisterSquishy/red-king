import { Card, Deck, Hand } from "typedeck";
import { Game, GameState } from "shared";

export enum DrawType {
  DECK,
  DISCARD,
}

interface SerializedGame {
  deck: Card[];
  discardPile: Card[];
  players: SerializedPlayer[];
  currentPlayer: number;
  _id: string;
  frozen?: boolean;
  state: GameState;
  gameName?: string;
}

interface SerializedPlayer {
  name: string;
  hand: Card[];
}

export const GameSerializer = (game: Game): SerializedGame => {
  return {
    _id: game._id,
    players: game.players.map((player) => {
      return {
        name: player.name,
        hand: player.hand.getCards(),
      };
    }),
    currentPlayer: game.currentPlayer,
    deck: game.deck.getCards(),
    discardPile: game.discardPile.getCards(),
    frozen: game.frozen,
    state: game.state,
    gameName: game.gameName,
  };
};

export const GameDeserializer = (serializedGame: SerializedGame): Game => {
  return {
    _id: serializedGame._id,
    players: serializedGame.players.map((player) => {
      return {
        name: player.name,
        hand: new Hand(player.hand),
      };
    }),
    currentPlayer: serializedGame.currentPlayer,
    deck: Deck.BuildFrom(serializedGame.deck),
    discardPile: Deck.BuildFrom(serializedGame.discardPile),
    frozen: serializedGame.frozen,
    state: serializedGame.state,
    gameName: serializedGame.gameName,
  };
};
