import React from "react";

import { DrawType, Hand } from "../../../../models/interfaces";

type CardOption = { label: string; value: number };

export default ({
  onDraw,
  onDiscard,
  onDiscardAndFinish,
  hand,
  hasDiscard,
  selectedCard = 0,
}: {
  onDraw: Function;
  onDiscard: Function;
  onDiscardAndFinish: Function;
  hand?: Hand;
  hasDiscard: boolean;
  selectedCard?: number;
}) => {
  return (
    <>
      {hand && hand.cards.length > 4 && (
        <>
          <button onClick={() => onDiscard(hand.cards[selectedCard])}>
            discard
          </button>
          <button onClick={() => onDiscardAndFinish(hand.cards[selectedCard])}>
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
