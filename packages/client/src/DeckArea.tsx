import React, { useContext } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { GameContext, PlayerContext } from "./GamePage";
import { DrawType } from "shared";
import CardStack from "./CardStack";
import { fetcher } from "./api";

const DeckArea = () => {
  const game = useContext(GameContext);
  const me = useContext(PlayerContext);
  const deckCards = Math.min(game.deck.cards.length, 6);
  const discardCards = Math.min(game.discardPile.cards.length, 6);
  const canDraw = game.players[game.currentPlayer].name === me;

  const onDraw = (drawType: DrawType) => {
    fetcher(`/games/${game._id}/draw`, {
      method: "POST",
      body: JSON.stringify({ userName: me, type: drawType }),
    });
  };

  const onDrawFromDeck = () => onDraw(DrawType.DECK);

  const onDrawFromDiscard = () => onDraw(DrawType.DISCARD);

  return (
    <Box>
      <HStack spacing="24px">
        <CardStack
          cardsToRender={deckCards}
          onClick={canDraw ? onDrawFromDeck : undefined}
        />
        <CardStack
          cardsToRender={discardCards}
          onClick={canDraw ? onDrawFromDiscard : undefined}
        />
      </HStack>
    </Box>
  );
};

export default DeckArea;
