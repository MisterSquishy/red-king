import React, { useState } from "react";
import classnames from "classnames";
import { PlayingCard } from "typedeck";
import { Hand } from "../../models/interfaces";
import Card from "../Card";
import { cardEquals } from "../Card//util";

import "./style.css";

export default ({
  hand,
  showableCards = 0,
  shownCards = [],
  selectedCard,
  selectable = false,
  onSelect = () => {},
  drawnCard,
}: {
  hand: Hand;
  showableCards?: number;
  shownCards?: PlayingCard[];
  selectedCard?: PlayingCard;
  selectable?: boolean;
  onSelect?: Function;
  drawnCard?: PlayingCard;
}) => {
  const [flippedCards, setCardsFlipped] = useState<PlayingCard[]>([]);

  const flipCard = (card: PlayingCard) => {
    setCardsFlipped([card, ...flippedCards]);
  };

  const clickable = selectable || flippedCards.length < showableCards;
  const clickHandler = selectable ? onSelect : flipCard;

  return (
    <div className="hand-container">
      {hand.cards.map((card) => (
        <div
          key={JSON.stringify(card)}
          className={classnames({
            selected: selectable && cardEquals(selectedCard, card),
            drawn: drawnCard && cardEquals(drawnCard, card),
          })}
        >
          <Card
            card={card}
            key={JSON.stringify(card)}
            hidden={
              !flippedCards.includes(card) &&
              !shownCards.includes(card) &&
              !(drawnCard && cardEquals(drawnCard, card))
            }
            clickable={clickable}
            onClick={clickHandler}
          />
        </div>
      ))}
    </div>
  );
};
