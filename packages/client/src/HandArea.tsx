import { Grid, GridItem, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import Card from "./Card";
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
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
      >
        {hand?.cards.map((card) => (
          <GridItem>
            <Card card={card} exposed={false} />
          </GridItem>
        ))}
      </Grid>
    </Heading>
  );
};

export default HandArea;
