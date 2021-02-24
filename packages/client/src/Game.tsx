import useSocket from "./hooks/useSocket";
import { useParams } from "react-router-dom";
import React from "react";

const Game: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [connected, socket] = useSocket(gameId);

  return <div>{!connected ? "connecting" : "connected"} This is game</div>;
};

export default Game;
