import React, { useContext } from "react";
import { PlayingCard } from "typedeck";
import { GameContext, PlayerContext } from "../../../../App";
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

  return (
    <div className="card-area">
      <MyArea
        drawnCard={drawnCard}
        onDraw={onDraw}
        onDiscard={onDiscard}
        onDiscardAndFinish={onDiscardAndFinish}
        activeSideEffect={activeSideEffect}
        onDone={onDone}
      />
      {game &&
        game.players
          .filter((player) => player.name !== userName)
          .map((player) => (
            <OpponentArea player={player} activeSideEffect={activeSideEffect} />
          ))}
    </div>
  );
};
