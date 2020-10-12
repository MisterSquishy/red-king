import React, { useContext, useState } from "react";
import { useToasts } from "react-toast-notifications";

import { PlayerContext } from "../../App";
import { joinGame } from "../../api";

export default () => {
  const { userName, setGameId } = useContext(PlayerContext);
  const [unsavedGameId, setUnsavedGameId] = useState("");
  const { addToast } = useToasts();

  const joinGameHandler = () => {
    joinGame(unsavedGameId, userName || "")
      .then((resp) => setGameId(resp.data.gameId))
      .catch((err) => {
        console.error(err);
        addToast(err.message, { appearance: "error", autoDismiss: true });
      });
  };

  return (
    <>
      <h1>...or wanna join a game?</h1>
      <input
        onChange={(event) => setUnsavedGameId(event.target.value)}
        value={unsavedGameId}
      />
      <button onClick={joinGameHandler}>join game</button>
    </>
  );
};
