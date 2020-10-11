import React, { useContext } from "react";
import { AxiosResponse } from "axios";

import { GameContext, PlayerContext, SocketContext } from "../../App";
import { GameState, DrawType } from "../../models/interfaces";
import WaitingRoom from "./WaitingRoom";
import Turn from "./Turn";
import Finished from "./Finished";
import { discard, draw } from "../../api";
import { Card } from "typedeck";

export default () => {
  const { userName, gameId } = useContext(PlayerContext);
  const socket = useContext(SocketContext);
  const { game, gameState } = useContext(GameContext);

  const onStart = () => {
    socket.emit("StateChange", gameId, GameState.IN_PROGRESS);
  };

  const onDraw = (type: DrawType) => {
    return gameId && userName && draw(gameId, userName, type);
  };

  const onDiscard = (card: Card): Promise<AxiosResponse | void> => {
    if (gameId && userName) {
      return discard(gameId, userName, card);
    }
    return Promise.resolve();
  };

  const onDiscardAndFinish = (card: Card) => {
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
          onDraw={onDraw}
          onDiscard={onDiscard}
          onDiscardAndFinish={onDiscardAndFinish}
        />
      )}
      {gameState === GameState.FINISHED && game && (
        <Finished game={game} userName={userName} />
      )}
    </>
  );
};
