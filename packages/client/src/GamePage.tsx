import useSocket from "./hooks/useSocket";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Game, GameState } from "shared";
import { fetcher } from "./api";

const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [connected, socket] = useSocket();
  const name = JSON.parse(window.localStorage.getItem("game") ?? "{}")[gameId];
  const [game, setGame] = useState<Game>();
  const alone = !game || game?.players?.length <= 1;

  useEffect(() => {
    if (connected) {
      socket.on("GameUpdate", setGame);
      socket.emit("join", gameId);
    }
  }, [connected, gameId, socket, setGame]);

  const startGame = () =>
    fetcher(`/games/${game?._id}/state`, {
      method: "PATCH",
      body: JSON.stringify({ state: 1 }), //todo GameState.IN_PROGRESS }),
    }).then((res) => res.json());

  return (
    <div>
      <h2>hey {name}</h2>
      <h4>
        you're {!connected ? "connecting" : "connected"} to{" "}
        {game?.gameName || "the game"}, which is {game?.state}.
      </h4>
      <p>
        you're here{" "}
        {alone
          ? "alone"
          : `with ${game?.players.map((player) => player.name).join(", ")}`}
      </p>
      <button onClick={startGame}>get cookin</button>
    </div>
  );
};

export default GamePage;
