import React from "react";
import classnames from "classnames";
import { PlayingCard } from "typedeck";
import { Hand } from "../../models/interfaces";
import Card from "../Card";
import { cardEquals } from "../Card//util";

import "./style.css";

export default ({
  hand,
  shownCards = [],
  selectedCard,
  selectable = false,
  onSelect = () => {},
  drawnCard,
}: {
  hand: Hand;
  shownCards?: PlayingCard[];
  selectedCard?: PlayingCard;
  selectable?: boolean;
  onSelect?: Function;
  drawnCard?: PlayingCard;
}) => {
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
              !shownCards.includes(card) &&
              !(drawnCard && cardEquals(drawnCard, card))
            }
            clickable={selectable}
            onClick={onSelect}
          />
        </div>
      ))}
    </div>
  );
};
