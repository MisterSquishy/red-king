import React, { useState } from "react";
import classnames from "classnames";
import { PlayingCard } from "typedeck";
import { Hand } from "../../models/interfaces";
import Card from "../Card";
import { displayName } from "../Card/util";

import "./style.css";

export default ({
  hand,
  showableCards = 0,
  shownCards = [],
  selectedCard,
  selectable = false,
  onSelect = () => {},
}: {
  hand: Hand;
  showableCards?: number;
  shownCards?: PlayingCard[];
  selectedCard?: PlayingCard;
  selectable?: boolean;
  onSelect?: Function;
}) => {
  const [flippedCards, setCardsFlipped] = useState<string[]>([]);

  const flipCard = (card: PlayingCard) => {
    setCardsFlipped([displayName(card), ...flippedCards]);
  };

  const clickable = selectable || flippedCards.length < showableCards;
  const clickHandler = selectable ? onSelect : flipCard;

  return (
    <div className="hand-container">
      {hand.cards.map((card) => (
        <div
          key={JSON.stringify(card)}
          className={classnames({
            selected:
              selectable &&
              selectedCard &&
              displayName(selectedCard) === displayName(card),
          })}
        >
          <Card
            card={card}
            key={JSON.stringify(card)}
            hidden={
              !flippedCards.includes(displayName(card)) &&
              !shownCards.map(displayName).includes(displayName(card))
            }
            clickable={clickable}
            onClick={clickHandler}
          />
        </div>
      ))}
    </div>
  );
};
