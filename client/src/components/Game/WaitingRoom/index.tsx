import React from "react";
import { Game, Player } from "../../../models/interfaces";
import Hand from "../../Hand";

export default ({
  userName,
  gameId,
  game,
  onStart,
}: {
  userName?: string;
  gameId?: string;
  game?: Game;
  onStart: Function;
}) => {
  const player = game?.players.filter((player) => player.name === userName)[0];
  const otherPlayers = game?.players.filter(
    (player) => player.name !== userName
  );

  return (
    <>
      <h1>Hey</h1>
      <div>
        {userName}, you are ready to rumble in {gameId}
      </div>
      <h3>who the hell else is here?</h3>
      {otherPlayers && otherPlayers.length ? (
        otherPlayers.map((player: Player) => (
          <p key={JSON.stringify(player)}>{player.name}</p>
        ))
      ) : (
        <p>nobody</p>
      )}
      <h3>what's in my hand?</h3>
      {player ? (
        <Hand hand={player.hand} showableCards={2} />
      ) : (
        <p>wait who even are you</p>
      )}
      <button disabled={!otherPlayers} onClick={() => onStart()}>
        Let's go!
      </button>
    </>
  );
};
