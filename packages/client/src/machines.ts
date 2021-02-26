import { Machine } from "xstate";

export const gameMachine = Machine({
  id: "game",
  initial: "landing",
  states: {
    landingPage: {
      on: { createGame: "hostWaiting", joinGame: "playerWaiting" },
    },
    hostWaiting: {
      on: { start: "playGame" },
    },
    playerWaiting: {
      on: { start: "playGame" },
    },
    playGame: {},
  },
});

export const sideEffectsMachine = Machine({
  id: "sideEffects",
  initial: "none",
  states: {
    none: {
      on: { lookyMe: "lookyMeChoose" },
    },
    lookyMeChoose: {
      on: { lookyMeChooseCard: "lookyMeReveal" },
    },
    lookyMeReveal: {
      on: { lookyMeDone: "none" }, //todo end turn
    },
  },
});
