import { Card } from "../types";

export enum SideEffect {
  LOOKY_YOU,
  LOOKY_ME,
  NO_LOOK_SWAP,
  LOOKY_SWAPPY
}

export const getSideEffect = (card: Card): SideEffect | undefined => {
  switch (card.cardName) {
    case "Five":
    case "Six":
      return SideEffect.LOOKY_YOU;
    case "Seven":
    case "Eight":
      return SideEffect.LOOKY_ME;
    case "Nine":
    case "Ten":
      return SideEffect.NO_LOOK_SWAP;
    case "Jack":
    case "King":
      return SideEffect.LOOKY_SWAPPY;
  }
};
