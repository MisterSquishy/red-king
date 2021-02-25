import { Grid, GridItem, Heading, HStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import Card from "./Card";
import { GameContext, PlayerContext, SideEffectsContext } from "./GamePage";
import { Card as CardIF } from "./types";
import useDiscard from "./hooks/useDiscard";

const HandArea = ({ playerName }: { playerName: string }) => {
  const [sideEffectsState, send] = useContext(SideEffectsContext);
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
  const [revealedCard, setRevealedCard] = useState<CardIF | null>(null);

  const revealCard = (card: CardIF) => {
    setRevealedCard(card);
    send("lookyMeChooseCard");
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
                exposed={
                  revealedCard === card &&
                  sideEffectsState.value === "lookyMeReveal"
                }
                onClick={
                  isMine && drawnCard
                    ? () => onCardClick(card, drawnCard)
                    : sideEffectsState.value === "lookyMeChoose"
                    ? () => revealCard(card)
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
