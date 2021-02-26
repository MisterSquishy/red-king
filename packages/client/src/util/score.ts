import { Card } from "../types";

export const getScore = (cards: Card[]): number => {
  const baseScore = cards
    .map((card): number => {
      switch (card.cardName) {
        case "Ace":
          return 1;
        case "Two":
          return 2;
        case "Three":
          return 3;
        case "Four":
          return 4;
        case "Five":
          return 5;
        case "Six":
          return 6;
        case "Seven":
          return 7;
        case "Eight":
          return 8;
        case "Nine":
          return 9;
        case "Ten":
          return 10;
        case "Jack":
          return 11;
        case "Queen":
          if (card.suit === "Diamonds" || card.suit === "Hearts") {
            return 0;
          } else {
            return 12;
          }
        case "King":
          return 13;
        default:
          return -1;
      }
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue);

  const modifier =
    cards.filter(
      (card) =>
        card.cardName === "Queen" &&
        (card.suit === "Diamonds" || card.suit === "Hearts")
    ).length === 2
      ? -5
      : 0;

  return baseScore + modifier;
};
