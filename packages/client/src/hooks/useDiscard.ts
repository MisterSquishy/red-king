import { fetcher } from "../api";
import { Card } from "../types";
import { getSideEffect, SideEffect } from "../util/sideEffect";

const useDiscard = () => {
  return (
    gameId: string,
    cardToDiscard: Card,
    cardToAdd: Card,
    userName: string
  ) => {
    fetcher(`/games/${gameId}/discard`, {
      method: "POST",
      body: JSON.stringify({
        userName,
        drawnCard: cardToAdd,
        card: cardToDiscard,
      }),
    })
      .then(() => {
        switch (getSideEffect(cardToDiscard)) {
          case SideEffect.LOOKY_ME:
            console.log("WOOF");
        }
      })
      .then(() => {
        fetcher(`/games/${gameId}/end/turn`, {
          method: "POST",
          body: JSON.stringify({ userName }),
        });
      });
  };
};

export default useDiscard;
