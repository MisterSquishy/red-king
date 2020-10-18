import React, { useContext } from "react";
import { PlayingCard } from "typedeck";
import { GameContext, PlayerContext } from "../../../../../../App";
import {
  DiscardSideEffect,
  DrawType,
} from "../../../../../../models/interfaces";

export default ({
  onDraw,
  onDiscard,
  onDiscardAndFinish,
  onDone,
  activeSideEffect,
  selectedCard,
}: {
  onDraw: Function;
  onDiscard: Function;
  onDiscardAndFinish: Function;
  onDone: Function;
  activeSideEffect?: DiscardSideEffect;
  selectedCard?: PlayingCard;
}) => {
  const { userName } = useContext(PlayerContext);
  const { game } = useContext(GameContext);
  const myHand =
    game && game.players.find((player) => player.name === userName)?.hand;
  return (
    <>
      {myHand && myHand.cards.length > 4 && (
        <>
          <button onClick={() => onDiscard(selectedCard)}>discard</button>
          <button onClick={() => onDiscardAndFinish(selectedCard)}>
            discard and finish
          </button>
        </>
      )}
      {myHand && myHand.cards.length < 5 && (
        <>
          <button onClick={() => onDraw(DrawType.DECK)}>draw from deck</button>
          <button
            disabled={game && game.discardPile.cards.length === 0}
            onClick={() => onDraw(DrawType.DISCARD)}
          >
            draw from discard
          </button>
        </>
      )}
      {activeSideEffect !== undefined && (
        <button onClick={() => onDone()}>End turn</button>
      )}
    </>
  );
};
