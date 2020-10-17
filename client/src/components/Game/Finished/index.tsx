import React from "react";
import { cardValue } from "../../Card/util";
import { Game } from "../../../models/interfaces";
import Hand from "../../Hand";

export default ({ game, userName }: { game: Game; userName?: string }) => {
  const finalScores = game.players.reduce((map, player) => {
    map.set(
      player.name,
      player.hand.cards.map(cardValue).reduce((total, card) => total + card)
    );
    return map;
  }, new Map<string, number>());

  const iWon =
    finalScores.get(userName || "") === Math.min(...finalScores.values());

  return (
    <>
      <h1>{`${iWon ? "YOU WON" : "You didn't win"}`}</h1>
      {Array.from(finalScores.entries()).map((playerScore, index) => {
        const playerHand = game.players.find(
          (player) => player.name === playerScore[0]
        )?.hand;
        return (
          <>
            <p key={playerScore[0]}>
              {playerScore[0]}: {playerScore[1]}
            </p>
            {playerHand && (
              <Hand hand={playerHand} shownCards={playerHand.cards} />
            )}
          </>
        );
      })}
    </>
  );
};
