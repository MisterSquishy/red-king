import React, { useContext } from "react";
import { useToasts } from "react-toast-notifications";

import { PlayerContext } from "../../App";
import { createGame } from "../../api";

export default () => {
  const { userName, setGameId } = useContext(PlayerContext);
  const { addToast } = useToasts();

  const createGameHandler = () => {
    createGame(userName || "")
      .then((resp) => setGameId(resp.data.gameId))
      .catch((err) => {
        console.error(err);
        addToast(err.message, { appearance: "error", autoDismiss: true });
      });
  };

  return (
    <>
      <h1>Wanna make a game?</h1>
      <button onClick={createGameHandler}>Make game</button>
      <p>do it {userName}</p>
    </>
  );
};
