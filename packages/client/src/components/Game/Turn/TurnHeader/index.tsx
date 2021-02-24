import React, { useContext } from "react";
import { PlayerContext } from "../../../../App";
import {
  DiscardSideEffect,
  DiscardSideEffectFriendlyName,
  Player,
} from "../../../../models/interfaces";

export default ({
  currentPlayer,
  activeSideEffect,
}: {
  currentPlayer?: Player;
  activeSideEffect?: DiscardSideEffect;
}) => {
  const { userName } = useContext(PlayerContext);
  const isMine = !!currentPlayer && currentPlayer.name === userName;

  return (
    <>
      {!isMine && currentPlayer && <p>Waiting on {currentPlayer.name}...</p>}
      {isMine && (
        <p>{`${
          activeSideEffect !== undefined
            ? DiscardSideEffectFriendlyName[activeSideEffect]
            : "Make your move!"
        }`}</p>
      )}
    </>
  );
};
