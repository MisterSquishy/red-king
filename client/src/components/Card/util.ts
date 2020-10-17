import { CardName, PlayingCard } from "typedeck";

export const displayName = (card: PlayingCard): string => {
  if (card.suit) {
    return `${card.cardName} of ${card.suit}`;
  } else {
    return "Joker";
  }
};

export const cardValue = (card: PlayingCard): number => {
  if (card.suit) {
    return parseInt(CardName[card.cardName], 10) + 1;
  } else {
    return -1;
  }
};
