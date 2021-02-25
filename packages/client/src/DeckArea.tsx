import React, { useContext } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { GameContext, PlayerContext } from "./GamePage";
import CardStack from "./CardStack";

const DeckArea = () => {
  const game = useContext(GameContext);
  const me = useContext(PlayerContext);
  const deckCards = Math.min(game.deck.cards.length, 6);
  const discardCards = Math.min(game.discardPile.cards.length, 6);
  const canDraw = game.players[game.currentPlayer].name === me;

  const onDraw = () => {
    console.log("draw");
  };

  return (
    <Box>
      <HStack spacing="24px">
        <CardStack
          cardsToRender={deckCards}
          onClick={canDraw ? onDraw : undefined}
        />
        <CardStack cardsToRender={discardCards} />
      </HStack>
    </Box>
  );
};

export default DeckArea;
