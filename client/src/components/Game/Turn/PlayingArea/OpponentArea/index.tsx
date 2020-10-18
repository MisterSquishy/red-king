import React, { useState } from "react";
import { PlayingCard } from "typedeck";
import { DiscardSideEffect, Player } from "../../../../../models/interfaces";
import Hand from "../../../../Hand";

export default ({
  player,
  activeSideEffect,
}: {
  player: Player;
  activeSideEffect?: DiscardSideEffect;
}) => {
  const [
    discardSideEffectSelectedCard,
    setDiscardSideEffectSelectedCard,
  ] = useState<PlayingCard | undefined>();

  return (
    <div className="player-hand-container" key={player.name}>
      <h2>{player.name}'s hand</h2>
      <Hand
        hand={player.hand}
        shownCards={
          activeSideEffect !== undefined &&
          discardSideEffectSelectedCard &&
          activeSideEffect in
            [DiscardSideEffect.LOOK_OTHER, DiscardSideEffect.LOOK_SWAP]
            ? [discardSideEffectSelectedCard]
            : []
        }
        selectable={
          !!(
            activeSideEffect !== undefined &&
            activeSideEffect in
              [
                DiscardSideEffect.LOOK_OTHER,
                DiscardSideEffect.LOOK_SWAP,
                DiscardSideEffect.BLIND_SWAP,
              ]
          )
        }
        onSelect={(card: PlayingCard) => {
          switch (activeSideEffect) {
            case DiscardSideEffect.LOOK_OTHER:
            case DiscardSideEffect.LOOK_SWAP:
              setDiscardSideEffectSelectedCard(card);
              return;
            case DiscardSideEffect.BLIND_SWAP:
              alert("oh fuck you swapped");
              return;
          }
        }}
        selectedCard={discardSideEffectSelectedCard}
      />
    </div>
  );
};
