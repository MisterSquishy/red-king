import React from "react";
import { PlayingCard } from "typedeck";

import { DrawType, Hand } from "../../../../models/interfaces";

type CardOption = { label: string; value: number };

export default ({
  onDraw,
  onDiscard,
  onDiscardAndFinish,
  hand,
  hasDiscard,
  selectedCard,
}: {
  onDraw: Function;
  onDiscard: Function;
  onDiscardAndFinish: Function;
  hand?: Hand;
  hasDiscard: boolean;
  selectedCard?: PlayingCard;
}) => {
  return (
    <>
      {hand && hand.cards.length > 4 && (
        <>
          <button onClick={() => onDiscard(selectedCard)}>discard</button>
          <button onClick={() => onDiscardAndFinish(selectedCard)}>
            discard and finish
          </button>
        </>
      )}
      {hand && hand.cards.length < 5 && (
        <>
          <button onClick={() => onDraw(DrawType.DECK)}>draw from deck</button>
          <button
            disabled={!hasDiscard}
            onClick={() => onDraw(DrawType.DISCARD)}
          >
            draw from discard
          </button>
        </>
      )}
    </>
  );
};
