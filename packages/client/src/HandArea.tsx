import { Grid, GridItem, Heading, HStack } from "@chakra-ui/react";
import { useContext } from "react";
import Card from "./Card";
import { GameContext, PlayerContext } from "./GamePage";
import { Card as CardIF } from "./types";
import useDiscard from "./hooks/useDiscard";

const HandArea = ({ playerName }: { playerName: string }) => {
  const game = useContext(GameContext);
  const currentPlayer = useContext(PlayerContext);
  const discard = useDiscard();
  const isMine = playerName === currentPlayer;
  const hand = game.players.find(player => player.name === playerName)
    ?.hand || { cards: [] };
  const cards = hand?.cards.length > 4 ? hand?.cards.slice(0, 4) : hand?.cards;
  const drawnCard = hand?.cards.length > 4 ? hand?.cards[4] : undefined;

  const onCardClick = (cardToDiscard: CardIF, cardToAdd: CardIF) => {
    discard(game._id, cardToDiscard, cardToAdd, currentPlayer);
  };

  return (
    <Heading as="h4" size="md">
      {isMine ? "My hand" : playerName}
      <HStack>
        <Grid
          h="200px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={4}
        >
          {cards.map((card, index) => (
            <GridItem key={index}>
              <Card
                card={card}
                exposed={false}
                onClick={
                  isMine && drawnCard
                    ? () => onCardClick(card, drawnCard)
                    : undefined
                }
              />
            </GridItem>
          ))}
        </Grid>
        {drawnCard && <Card exposed={isMine} card={drawnCard} />}
      </HStack>
    </Heading>
  );
};

export default HandArea;
