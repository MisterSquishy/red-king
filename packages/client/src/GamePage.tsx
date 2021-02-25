import useSocket from "./hooks/useSocket";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { Game, GameState } from "shared";

const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [connected, socket] = useSocket();
  const name = JSON.parse(window.localStorage.getItem("game") ?? "{}")[gameId];
  useEffect(() => {
    if (connected) {
      socket.on("GameUpdate", (game: Game) => console.log(game, "game"));
      socket.on("StateChange", (state: GameState) =>
        console.log(state, "state")
      );
      socket.emit("join", gameId);
    }
  }, [connected, gameId, socket]);

  return (
    <div>
      {!connected ? "connecting" : "connected"} to game. Your name is {name}
    </div>
  );
};

export default GamePage;
