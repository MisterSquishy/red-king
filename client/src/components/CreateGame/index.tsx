import React, { useContext } from "react";

import { PlayerContext } from "../../App";
import { createGame } from "../../api";

export default () => {
  const { userName, setGameId } = useContext(PlayerContext);

  const createGameHandler = () => {
    createGame(userName || "")
      .then((resp) => setGameId(resp.data.gameId))
      .catch(console.error);
  };

  return (
    <>
      <h1>Wanna make a game?</h1>
      <button onClick={createGameHandler}>Make game</button>
      <p>do it {userName}</p>
    </>
  );
};
