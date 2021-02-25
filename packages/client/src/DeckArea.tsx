import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { GameContext } from "./GamePage";
import CardStack from "./CardStack";

const DeckArea = () => {
  const game = useContext(GameContext);
  const cardsToRender = Math.min(game.deck.cards.length, 6);
  return (
    <Box>
      <CardStack cardsToRender={cardsToRender} />
    </Box>
  );
};

export default DeckArea;
