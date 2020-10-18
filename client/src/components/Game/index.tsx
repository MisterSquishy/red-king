import React, { useContext, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { AxiosResponse } from "axios";

import { GameContext, PlayerContext, SocketContext } from "../../App";
import {
  GameState,
  DrawType,
  DiscardSideEffect,
} from "../../models/interfaces";
import WaitingRoom from "./WaitingRoom";
import Turn from "./Turn";
import Finished from "./Finished";
import { discard, draw, endTurn } from "../../api";
import { PlayingCard } from "typedeck";
import { getDiscardSideEffect } from "../Card/util";

export default () => {
  const { userName, gameId } = useContext(PlayerContext);
  const socket = useContext(SocketContext);
  const { game, gameState } = useContext(GameContext);
  const { addToast } = useToasts();
  const [drawnCard, setDrawnCard] = useState<PlayingCard | undefined>();
  const [activeSideEffect, setActiveSideEffect] = useState<
    DiscardSideEffect | undefined
  >();

  const onStart = () => {
    socket.emit("StateChange", gameId, GameState.IN_PROGRESS);
  };

  const onDraw = (type: DrawType) => {
    return (
      gameId &&
      userName &&
      draw(gameId, userName, type)
        .then((resp) => setDrawnCard(resp.data))
        .catch((err) => {
          console.error(err);
          addToast(err.message, { appearance: "error", autoDismiss: true });
        })
    );
  };

  const doEndTurn = (): void => {
    if (gameId && userName) {
      setActiveSideEffect(undefined);
      endTurn(gameId, userName).catch((err) => {
        console.error(err);
        addToast(err.message, { appearance: "error", autoDismiss: true });
      });
    }
  };

  const doDiscardSideEffects = (card: PlayingCard) => {
    const discardSideEffect = getDiscardSideEffect(card);
    if (discardSideEffect === undefined) {
      doEndTurn();
    } else {
      setActiveSideEffect(discardSideEffect);
    }
  };

  const onDiscard = (card: PlayingCard): Promise<AxiosResponse | void> => {
    setDrawnCard(undefined);
    if (gameId && userName) {
      return discard(gameId, userName, card)
        .then(() => doDiscardSideEffects(card))
        .catch((err) => {
          console.error(err);
          addToast(err.message, { appearance: "error", autoDismiss: true });
        });
    }
    return Promise.resolve();
  };

  const onDiscardAndFinish = (card: PlayingCard) => {
    onDiscard(card).then(() =>
      socket.emit("StateChange", gameId, GameState.FINISHED)
    );
  };

  return (
    <>
      {gameState === GameState.WAITING && (
        <WaitingRoom
          userName={userName}
          gameId={gameId}
          game={game}
          onStart={onStart}
        />
      )}
      {gameState === GameState.IN_PROGRESS && game && (
        <Turn
          game={game}
          userName={userName}
          drawnCard={drawnCard}
          onDraw={onDraw}
          onDiscard={onDiscard}
          onDiscardAndFinish={onDiscardAndFinish}
          activeSideEffect={activeSideEffect}
          onDone={doEndTurn}
        />
      )}
      {gameState === GameState.FINISHED && game && (
        <Finished game={game} userName={userName} />
      )}
    </>
  );
};
