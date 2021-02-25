import { fetcher } from "../api";
import { Card } from "../types";

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
    }).then(() => {
      // todo side effectzzzz
      fetcher(`/games/${gameId}/end/turn`, {
        method: "POST",
        body: JSON.stringify({ userName }),
      });
    });
  };
};

export default useDiscard;
