import React, { useState } from "react";
import { PlayingCard } from "typedeck";
import { Hand } from "../../models/interfaces";
import Card from "../Card";

import "./style.css";

export default ({
  hand,
  showableCards = 0,
}: {
  hand: Hand;
  showableCards?: number;
}) => {
  const [cardsShown, setCardsShown] = useState<PlayingCard[]>([]);

  const showCard = (card: PlayingCard) => {
    setCardsShown([card, ...cardsShown]);
  };

  return (
    <div className="hand-container">
      {hand.cards.map((card) => (
        <Card
          card={card}
          key={JSON.stringify(card)}
          hidden={!cardsShown.includes(card)}
          showable={cardsShown.length < showableCards}
          onShow={showCard}
        />
      ))}
    </div>
  );
};
