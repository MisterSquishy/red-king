import React, { useContext, useState } from "react";
import { PlayingCard } from "typedeck";
import { GameContext, PlayerContext, SocketContext } from "../../../../App";
import { DiscardSideEffect } from "../../../../models/interfaces";
import MyArea from "./MyArea";
import OpponentArea from "./OpponentArea";

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
  const socket = useContext(SocketContext);

  const [selectedCardToSwap, setSelectedCardToSwap] = useState<
    PlayingCard | undefined
  >();
  const [targetCardToSwap, setTargetCardToSwap] = useState<
    PlayingCard | undefined
  >();
  const onSwap = (selectedCard?: PlayingCard, targetCard?: PlayingCard) => {
    if (game && selectedCard && targetCard) {
      const targetPlayer = game.players.find((player) =>
        player.hand.cards.includes(targetCard)
      );
      const targetHand = targetPlayer?.hand;
      const targetIndex = targetHand?.cards.indexOf(targetCard);
      if (targetHand && targetIndex) {
        targetHand.cards[targetIndex] = selectedCard;
      }

      const myHand = game.players.find((player) => player.name === userName)
        ?.hand;
      const myIndex = myHand?.cards.indexOf(selectedCard);
      if (myHand && myIndex) {
        myHand.cards[myIndex] = targetCard;
      }
      socket.emit("GameUpdate", game);
      onDone();
    }
  };

  return (
    <div className="card-area">
      <MyArea
        activeSideEffect={activeSideEffect}
        drawnCard={drawnCard}
        onDraw={onDraw}
        onDiscard={onDiscard}
        onDiscardAndFinish={onDiscardAndFinish}
        onDone={onDone}
        onSelectForSwap={(card: PlayingCard) => {
          setSelectedCardToSwap(card);
          onSwap(card, targetCardToSwap);
        }}
      />
      {game &&
        game.players
          .filter((player) => player.name !== userName)
          .map((player) => (
            <OpponentArea
              key={JSON.stringify(player)}
              activeSideEffect={activeSideEffect}
              player={player}
              onSelectForSwap={(card: PlayingCard) => {
                setTargetCardToSwap(card);
                onSwap(selectedCardToSwap, card);
              }}
            />
          ))}
    </div>
  );
};
