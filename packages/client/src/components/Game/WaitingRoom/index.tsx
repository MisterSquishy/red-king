import React, { useState } from "react";
import { PlayingCard } from "typedeck";
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
  const [shownCards, setShownCards] = useState<PlayingCard[]>([]);
  const showCard = (card: PlayingCard) => {
    setShownCards([card, ...shownCards]);
  };

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
        <Hand
          hand={player.hand}
          shownCards={shownCards}
          selectable={shownCards.length < 2}
          onSelect={showCard}
        />
      ) : (
        <p>wait who even are you</p>
      )}
      <button disabled={!otherPlayers} onClick={() => onStart()}>
        Let's go!
      </button>
    </>
  );
};
