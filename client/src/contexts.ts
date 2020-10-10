import { Game, GameState } from "./models/interfaces";

export interface PlayerContextIF {
  userName?: string
  setUserName: Function,
  gameId?: string
  setGameId: Function,
}

export interface GameContextIF {
  game?: Game
  gameState: GameState
}