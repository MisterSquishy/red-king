import { CardName, PlayingCard, Suit } from "typedeck";
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

export const displayIcon = (card: PlayingCard): string => {
  switch (+Suit[card.suit]) {
    case Suit.Diamonds:
      return "♦️";
    case Suit.Hearts:
      return "♥️";
    case Suit.Clubs:
      return "♣️";
    case Suit.Spades:
      return "♠️";
    default:
      return "🤡";
  }
};

export const cardValue = (card: PlayingCard): number => {
  if (card.suit) {
    return parseInt(CardName[card.cardName], 10) + 1;
  } else {
    return -1;
  }
};

export const isBlack = (suit: Suit) => suit in [Suit.Clubs, Suit.Spades];

export const getDiscardSideEffect = (
  card: PlayingCard
): DiscardSideEffect | undefined => {
  switch (+CardName[card.cardName]) {
    case CardName.King:
      return isBlack(+Suit[card.suit])
        ? DiscardSideEffect.LOOK_SWAP
        : undefined;
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
