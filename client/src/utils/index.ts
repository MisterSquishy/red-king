import { PlayingCard } from "typedeck";

export const displayName = (card: PlayingCard) => {
  return `${card.cardName} of ${card.suit}`;
};
