import React, { useContext } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { GameContext } from "./GamePage";
import CardStack from "./CardStack";

const DeckArea = () => {
  const game = useContext(GameContext);
  const deckCards = Math.min(game.deck.cards.length, 6);
  const discardCards = Math.min(game.discardPile.cards.length, 6);
  return (
    <Box>
      <HStack spacing="24px">
        <CardStack cardsToRender={deckCards} />
        <CardStack cardsToRender={discardCards} />
      </HStack>
    </Box>
  );
};

export default DeckArea;
