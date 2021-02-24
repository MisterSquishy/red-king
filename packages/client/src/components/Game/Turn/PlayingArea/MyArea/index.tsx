import React, { useContext, useState } from "react";
import { PlayingCard } from "typedeck";
import { GameContext, PlayerContext } from "../../../../../App";
import { DiscardSideEffect } from "../../../../../models/interfaces";
import Hand from "../../../../Hand";
import MyControls from "./MyControls";

export default ({
  activeSideEffect,
  drawnCard,
  onDraw,
  onDiscard,
  onDiscardAndFinish,
  onDone,
  onSelectForSwap,
}: {
  activeSideEffect?: DiscardSideEffect;
  drawnCard?: PlayingCard;
  onDraw: Function;
  onDiscard: Function;
  onDiscardAndFinish: Function;
  onDone: Function;
  onSelectForSwap: Function;
}) => {
  const { userName } = useContext(PlayerContext);
  const { game } = useContext(GameContext);
  const [selectedCard, setSelectedCard] = useState<PlayingCard | undefined>();
  const [
    discardSideEffectSelectedCard,
    setDiscardSideEffectSelectedCard,
  ] = useState<PlayingCard | undefined>();

  const currentPlayer = game && game.players[game.currentPlayer];
  const isMine = currentPlayer && currentPlayer.name === userName;
  const myHand =
    game && game.players.find((player) => player.name === userName)?.hand;
  const canDiscard = isMine && !!drawnCard;
  const canPeek =
    activeSideEffect === DiscardSideEffect.LOOK_SELF &&
    !discardSideEffectSelectedCard;
  const canSwap = !!(
    activeSideEffect !== undefined &&
    activeSideEffect in
      [DiscardSideEffect.LOOK_SWAP, DiscardSideEffect.BLIND_SWAP]
  );
  const handIsSelectable = canDiscard || canPeek || canSwap;
  const handSelectHandler = (card: PlayingCard) => {
    if (canDiscard) {
      setSelectedCard(card);
    } else if (canSwap) {
      setSelectedCard(card);
      onSelectForSwap(card);
    } else {
      setDiscardSideEffectSelectedCard(card);
    }
  };
  const shownCards =
    activeSideEffect !== undefined &&
    activeSideEffect === DiscardSideEffect.LOOK_SELF &&
    discardSideEffectSelectedCard
      ? [discardSideEffectSelectedCard]
      : [];

  return (
    <>
      <div className="player-hand-container">
        <h2>Your hand:</h2>
        {myHand && (
          <Hand
            hand={myHand}
            selectable={handIsSelectable}
            onSelect={handSelectHandler}
            selectedCard={selectedCard || undefined}
            shownCards={shownCards}
            drawnCard={drawnCard}
          />
        )}
        {isMine && (
          <MyControls
            onDraw={onDraw}
            onDiscard={onDiscard}
            onDiscardAndFinish={onDiscardAndFinish}
            onDone={onDone}
            activeSideEffect={activeSideEffect}
            selectedCard={selectedCard}
          />
        )}
      </div>
    </>
  );
};
