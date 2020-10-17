import { Card, CardName, PlayingCard, Suit } from "typedeck";
import { DiscardSideEffect } from "../../models/interfaces";

export const cardEquals = (card1?: PlayingCard, card2?: PlayingCard) => {
  if (!card1) {
    return !card2;
  } else if (!card2) {
    return !card1;
  }
  return card1.cardName === card2.cardName && card1.suit === card2.suit;
};

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

const isBlack = (suit: Suit) => suit in [Suit.Clubs, Suit.Spades];

export const getDiscardSideEffect = (
  card: Card
): DiscardSideEffect | undefined => {
  // @ts-ignore typescript is so bad at enums
  card.cardName = CardName[card.cardName];
  // @ts-ignore typescript is so bad at enums
  card.suit = Suit[card.suit];
  switch (card.cardName) {
    case CardName.King:
      // @ts-ignore im so bad at typescript
      return isBlack(card.suit) ? DiscardSideEffect.LOOK_SWAP : undefined;
    case CardName.Queen:
    case CardName.Jack:
      return DiscardSideEffect.BLIND_SWAP;
    case CardName.Ten:
    case CardName.Nine:
      return DiscardSideEffect.LOOK_OTHER;
    case CardName.Eight:
    case CardName.Seven:
      return DiscardSideEffect.LOOK_SELF;
  }
};
