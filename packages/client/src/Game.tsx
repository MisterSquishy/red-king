import { useParams } from "react-router-dom";
import React from "react";

const Game: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  console.log(gameId);
  return <div>This is game</div>;
};

export default Game;
