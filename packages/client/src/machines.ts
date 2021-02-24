import { Machine } from "xstate";

export const gameMachine = Machine({
  id: "game",
  initial: "landing",
  states: {
    landingPage: {
      on: { createGame: "hostWaiting", joinGame: "playerWaiting" }
    },
    hostWaiting: {
      on: { start: "playGame" }
    },
    playerWaiting: {
      on: { start: "playGame" }
    },
    playGame: {}
  }
});
