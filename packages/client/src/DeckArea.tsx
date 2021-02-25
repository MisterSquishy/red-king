import React, { useContext } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { GameContext, PlayerContext } from "./GamePage";
import { DrawType, GameState } from "shared";
import CardStack from "./CardStack";
import { fetcher } from "./api";
import useDiscard from "./hooks/useDiscard";

const DeckArea = () => {
  const game = useContext(GameContext);
  const me = useContext(PlayerContext);
  const discard = useDiscard();
  const deckCards = Math.min(game.deck.cards.length, 6);
  const discardCards = Math.min(game.discardPile.cards.length, 6);
  const canDraw =
    game.state === GameState.IN_PROGRESS && // game is underway
    game.players[game.currentPlayer].name === me && // it's my turn
    game.players[game.currentPlayer].hand.cards.length === 4; // i havent drawn a card yet
  const canDiscard =
    game.state === GameState.IN_PROGRESS && // game is underway
    game.players[game.currentPlayer].name === me && // it's my turn
    game.players[game.currentPlayer].hand.cards.length === 5; // i have drawn a card

  console.log(game.players[game.currentPlayer].hand.cards);

  const onDraw = (drawType: DrawType) => {
    fetcher(`/games/${game._id}/draw`, {
      method: "POST",
      body: JSON.stringify({ userName: me, type: drawType }),
    });
  };
  const onDrawFromDeck = () => onDraw(DrawType.DECK);
  const onDrawFromDiscard = () => onDraw(DrawType.DISCARD);

  const onDiscard = () => {
    const drawnCard = game.players[game.currentPlayer].hand.cards[4];
    discard(game._id, drawnCard, drawnCard, me);
  };

  return (
    <Box>
      <HStack spacing="24px">
        <CardStack
          cardsToRender={deckCards}
          onClick={canDraw && deckCards > 0 ? onDrawFromDeck : undefined}
        />
        <CardStack
          cardsToRender={discardCards}
          topCard={
            game.discardPile.cards.length > 0
              ? game.discardPile.cards[discardCards - 1]
              : undefined
          }
          onClick={
            canDraw && discardCards > 0
              ? onDrawFromDiscard
              : canDiscard
              ? onDiscard
              : undefined
          }
        />
      </HStack>
    </Box>
  );
};

export default DeckArea;
