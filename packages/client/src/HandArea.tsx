import { Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import CardStack from "./CardStack";
import { GameContext, PlayerContext } from "./GamePage";

const HandArea = ({ playerName }: { playerName: string }) => {
  const game = useContext(GameContext);
  const currentPlayer = useContext(PlayerContext);
  const isMine = playerName === currentPlayer;
  const hand = game.players.find((player) => player.name === playerName)?.hand;
  console.log(game);

  return (
    <Heading as="h4" size="md">
      {isMine ? "My hand" : playerName}
      {hand && <CardStack cardsToRender={hand.cards.length} />}
    </Heading>
  );
};

export default HandArea;
