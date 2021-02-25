import { useContext } from "react";
import { fetcher } from "../api";
import { Card } from "../types";
import { getSideEffect, SideEffect } from "../util/sideEffect";
import { SideEffectsContext } from "../GamePage";

const useDiscard = () => {
  const [_, sendSideEffect] = useContext(SideEffectsContext);

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
        card: cardToDiscard
      })
    });
    switch (getSideEffect(cardToDiscard)) {
      case SideEffect.LOOKY_ME:
        sendSideEffect("lookyMe");
    }
  };
};

export default useDiscard;
