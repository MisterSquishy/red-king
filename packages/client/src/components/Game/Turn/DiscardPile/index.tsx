import React, { useContext } from "react";
import { GameContext } from "../../../../App";
import Card from "../../../Card";

export default () => {
  const { game } = useContext(GameContext);

  return (
    <>
      <div>
        <h2>Top of discard pile:</h2>
        {game && game.discardPile.cards.length ? (
          <Card card={game.discardPile.cards[0]} hidden={false} />
        ) : (
          "No discard pile yet"
        )}
      </div>
    </>
  );
};
