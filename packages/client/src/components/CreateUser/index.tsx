import React, { useContext, useState } from "react";
import { useToasts } from "react-toast-notifications";

import { PlayerContext } from "../../App";
import { createUser } from "../../api";

export default () => {
  const { setUserName } = useContext(PlayerContext);
  const [unsavedUserName, setUnsavedUserName] = useState("");
  const { addToast } = useToasts();

  const createUserHandler = (userName: string, setUserName: Function) => {
    createUser(userName)
      .then((resp) => setUserName(resp.data.userName))
      .catch((err) => {
        console.error(err);
        addToast(err.message, { appearance: "error", autoDismiss: true });
      });
  };

  return (
    <>
      <h1>Who are you?</h1>
      <input
        onChange={(event) => setUnsavedUserName(event.target.value)}
        value={unsavedUserName}
      />
      <button
        disabled={!unsavedUserName}
        onClick={() => createUserHandler(unsavedUserName || "", setUserName)}
      >
        Be you
      </button>
    </>
  );
};
