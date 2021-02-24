import React, { useContext } from "react";
import { PlayingCard } from "typedeck";
import { GameContext } from "../../../App";
import { DiscardSideEffect } from "../../../models/interfaces";
import DiscardPile from "./DiscardPile";
import PlayingArea from "./PlayingArea";

import "./style.css";
import TurnHeader from "./TurnHeader";

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
  const { game } = useContext(GameContext);
  const currentPlayer = game && game.players[game.currentPlayer];

  return (
    <>
      <TurnHeader
        currentPlayer={currentPlayer}
        activeSideEffect={activeSideEffect}
      />
      <DiscardPile />
      <PlayingArea
        drawnCard={drawnCard}
        onDraw={onDraw}
        onDiscard={onDiscard}
        onDiscardAndFinish={onDiscardAndFinish}
        activeSideEffect={activeSideEffect}
        onDone={onDone}
      />
    </>
  );
};
