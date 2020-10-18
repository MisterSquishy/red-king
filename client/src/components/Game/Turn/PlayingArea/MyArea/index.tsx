import React, { useContext, useState } from "react";
import { PlayingCard } from "typedeck";
import { GameContext, PlayerContext } from "../../../../../App";
import { DiscardSideEffect } from "../../../../../models/interfaces";
import Hand from "../../../../Hand";
import MyControls from "./MyControls";

export default ({
  drawnCard,
  onDraw,
  onDiscard,
  onDiscardAndFinish,
  activeSideEffect,
  onDone,
}: {
  drawnCard?: PlayingCard;
  onDraw: Function;
  onDiscard: Function;
  onDiscardAndFinish: Function;
  activeSideEffect?: DiscardSideEffect;
  onDone: Function;
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
  const handIsSelectable = canDiscard || canPeek;
  const handSelectHandler = (card: PlayingCard) => {
    if (canDiscard) {
      setSelectedCard(card);
    } else {
      setDiscardSideEffectSelectedCard(card);
    }
  };

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
            shownCards={
              discardSideEffectSelectedCard
                ? [discardSideEffectSelectedCard]
                : []
            }
            drawnCard={drawnCard}
          />
        )}
        <MyControls
          onDraw={onDraw}
          onDiscard={onDiscard}
          onDiscardAndFinish={onDiscardAndFinish}
          onDone={onDone}
          activeSideEffect={activeSideEffect}
          selectedCard={selectedCard}
        />
      </div>
    </>
  );
};
