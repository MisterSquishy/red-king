import { Grid, GridItem, Heading, HStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import Card from "./Card";
import { GameContext, PlayerContext, SideEffectsContext } from "./GamePage";
import { Card as CardIF } from "./types";
import useDiscard from "./hooks/useDiscard";
import { GameState } from "shared";

const HandArea = ({ playerName }: { playerName: string }) => {
  const [sideEffectsState, send] = useContext(SideEffectsContext);
  const game = useContext(GameContext);
  const isOver = game.state === GameState.FINISHED;
  const isWaiting = game.state === GameState.WAITING;
  const currentPlayer = useContext(PlayerContext);
  const discard = useDiscard();
  const isMine = playerName === currentPlayer;
  const hand = game.players.find((player) => player.name === playerName)
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

  const cardIsExposed = (card: CardIF) => {
    if (isOver) {
      // show everything when the game ends
      return true;
    } else if (
      revealedCard === card &&
      (sideEffectsState.value === "lookyMeReveal" || isWaiting)
    ) {
      // some effect has revealed this card
      return true;
    }
  };

  const getClickCallback = (card: CardIF) => {
    if (isMine && drawnCard) {
      // it's my turn and i drew a card, swap it with the one i picked
      return () => onCardClick(card, drawnCard);
    } else if (sideEffectsState.value === "lookyMeChoose") {
      // looky me -- select one card to reveal
      return () => revealCard(card);
    } else if (isWaiting) {
      // before the game starts, up to two cards can be revealed
      //  TODO UP TO TWO
      return () => revealCard(card);
    }
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
                exposed={cardIsExposed(card)}
                onClick={getClickCallback(card)}
              />
            </GridItem>
          ))}
        </Grid>
        {drawnCard && <Card exposed={isMine || isOver} card={drawnCard} />}
      </HStack>
    </Heading>
  );
};

export default HandArea;
