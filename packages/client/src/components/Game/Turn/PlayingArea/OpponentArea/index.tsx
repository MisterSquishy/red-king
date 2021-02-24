import React, { useState } from "react";
import { PlayingCard } from "typedeck";
import { DiscardSideEffect, Player } from "../../../../../models/interfaces";
import Hand from "../../../../Hand";

export default ({
  player,
  activeSideEffect,
  onSelectForSwap,
}: {
  player: Player;
  activeSideEffect?: DiscardSideEffect;
  onSelectForSwap: Function;
}) => {
  const [
    discardSideEffectSelectedCard,
    setDiscardSideEffectSelectedCard,
  ] = useState<PlayingCard | undefined>();

  const canPeek = !!(
    activeSideEffect !== undefined &&
    !discardSideEffectSelectedCard &&
    activeSideEffect in
      [
        DiscardSideEffect.LOOK_OTHER,
        DiscardSideEffect.LOOK_SWAP,
        DiscardSideEffect.BLIND_SWAP,
      ]
  );
  const shownCards =
    activeSideEffect !== undefined && discardSideEffectSelectedCard
      ? [discardSideEffectSelectedCard]
      : [];
  const onSelectDiscardSideEffectCard = (card: PlayingCard) => {
    if (activeSideEffect === DiscardSideEffect.BLIND_SWAP) {
      onSelectForSwap(card);
    } else if (activeSideEffect === DiscardSideEffect.LOOK_SWAP) {
      setDiscardSideEffectSelectedCard(card);
      onSelectForSwap(card);
    } else {
      setDiscardSideEffectSelectedCard(card);
    }
  };

  return (
    <div className="player-hand-container" key={player.name}>
      <h2>{player.name}'s hand</h2>
      <Hand
        hand={player.hand}
        shownCards={shownCards}
        selectable={canPeek}
        onSelect={onSelectDiscardSideEffectCard}
      />
    </div>
  );
};
