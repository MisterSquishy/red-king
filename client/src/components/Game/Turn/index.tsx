import React, { useState } from "react";
import { PlayingCard } from "typedeck";
import {
  DiscardSideEffect,
  DiscardSideEffectFriendlyName,
  Game,
} from "../../../models/interfaces";
import Card from "../../Card";
import Hand from "../../Hand";
import MyTurn from "./MyTurn";

import "./style.css";

export default ({
  game,
  userName,
  drawnCard,
  onDraw,
  onDiscard,
  onDiscardAndFinish,
  activeSideEffect,
  onDone,
}: {
  game: Game;
  userName?: string;
  drawnCard?: PlayingCard;
  onDraw: Function;
  onDiscard: Function;
  onDiscardAndFinish: Function;
  activeSideEffect?: DiscardSideEffect;
  onDone: Function;
}) => {
  const currentPlayer = game.players[game.currentPlayer];
  const isMine = game && currentPlayer.name === userName;
  const myHand = game.players.find((player) => player.name === userName)?.hand;
  const [selectedCard, setSelectedCard] = useState<PlayingCard | undefined>();
  const [
    discardSideEffectSelectedCard,
    setDiscardSideEffectSelectedCard,
  ] = useState<PlayingCard | undefined>();

  return (
    <>
      {!isMine && (
        <>
          <p>Waiting on {currentPlayer.name}...</p>
        </>
      )}
      {isMine && (
        <>
          <p>{`${
            activeSideEffect
              ? DiscardSideEffectFriendlyName[activeSideEffect]
              : "Make your move!"
          }`}</p>
        </>
      )}
      <div>
        <h2>Top of discard pile:</h2>
        {game.discardPile.cards.length ? (
          <Card card={game.discardPile.cards[0]} hidden={false} />
        ) : (
          "No discard pile yet"
        )}
      </div>
      <div className="card-area">
        <div className="player-hand-container">
          <h2>Your hand:</h2>
          {myHand && (
            <Hand
              hand={myHand}
              selectable={
                (isMine && !!drawnCard) ||
                activeSideEffect === DiscardSideEffect.LOOK_SELF
              }
              onSelect={(card: PlayingCard) => {
                if (isMine && !!drawnCard) {
                  setSelectedCard(card);
                } else {
                  setDiscardSideEffectSelectedCard(card);
                }
              }}
              selectedCard={selectedCard || undefined}
              shownCards={
                discardSideEffectSelectedCard
                  ? [discardSideEffectSelectedCard]
                  : []
              }
              drawnCard={drawnCard}
            />
          )}
          {isMine && (
            <MyTurn
              onDiscard={onDiscard}
              onDraw={onDraw}
              onDiscardAndFinish={onDiscardAndFinish}
              hand={myHand}
              hasDiscard={game.discardPile.cards.length > 0}
              selectedCard={selectedCard}
            />
          )}
          {activeSideEffect && (
            <button onClick={() => onDone()}>End turn</button>
          )}
        </div>
        {game.players
          .filter((player) => player.name !== userName)
          .map((player) => (
            <div className="player-hand-container">
              <h2>{player.name}'s hand</h2>
              <Hand
                hand={player.hand}
                shownCards={
                  activeSideEffect &&
                  discardSideEffectSelectedCard &&
                  activeSideEffect in
                    [DiscardSideEffect.LOOK_OTHER, DiscardSideEffect.LOOK_SWAP]
                    ? [discardSideEffectSelectedCard]
                    : []
                }
                selectable={
                  !!(
                    activeSideEffect &&
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
          ))}
      </div>
    </>
  );
};
