import React, { useState } from "react";
import Select from "react-select";

import { DrawType, Hand } from "../../../../models/interfaces";
import { displayName } from "../../../Card/util";

type CardOption = { label: string; value: number };

export default ({
  onDraw,
  onDiscard,
  onDiscardAndFinish,
  hand,
  hasDiscard,
}: {
  onDraw: Function;
  onDiscard: Function;
  onDiscardAndFinish: Function;
  hand?: Hand;
  hasDiscard: boolean;
}) => {
  const [selectedCard, setSelectedCard] = useState<number>(0);

  return (
    <>
      {hand && hand.cards.length > 4 && (
        <>
          Pick a card to discard:
          <Select
            options={hand.cards.map((card, index) => {
              return {
                value: index,
                label: displayName(card),
              } as CardOption;
            })}
            value={
              {
                value: selectedCard,
                label: displayName(hand.cards[selectedCard]),
              } as CardOption
            }
            onChange={(selectedOption) =>
              setSelectedCard((selectedOption as CardOption).value || 0)
            }
          />
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
