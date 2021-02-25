import useSocket from "./hooks/useSocket";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetcher } from "./api";
import DeckArea from "./DeckArea";
import { Game } from "./types";
import {
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import HUD from "./Hud";

const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [connected, socket] = useSocket();
  const name = JSON.parse(window.localStorage.getItem("game") ?? "{}")[gameId];
  const [game, setGame] = useState<Game>();
  const alone = !game || game?.players?.length <= 1;

  useEffect(() => {
    if (connected) {
      socket.on("GameUpdate", setGame);
      socket.emit("join", gameId);
    }
  }, [connected, gameId, socket, setGame]);

  const startGame = () =>
    fetcher(`/games/${game?._id}/state`, {
      method: "PATCH",
      body: JSON.stringify({ state: 1 }), //todo GameState.IN_PROGRESS }),
    }).then((res) => res.json());

  return (
    <div>
      <Heading as="h2" size="xl">
        hey {name}
      </Heading>
      <Heading as="h4" size="lg">
        you're {!connected ? "connecting" : "connected"} to{" "}
        {game?.gameName || "the game"}, which is {game?.state}.
      </Heading>
      <Text fontSize="lg">
        you're here{" "}
        {alone
          ? "alone"
          : `with ${game?.players.map((player) => player.name).join(", ")}`}
      </Text>
      <Button onClick={startGame}>get cookin</Button>
      {game && (
        <Grid
          h="200px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={1} bg="papayawhip" />
          <GridItem colSpan={3}>
            <Center>
              <VStack w="100%">
                <DeckArea deckSize={game.deck.cards.length} />
                <HUD />
              </VStack>
            </Center>
          </GridItem>
          <GridItem rowSpan={2} colSpan={1} bg="papayawhip" />
          <GridItem colSpan={3} bg="papayawhip" />
        </Grid>
      )}
    </div>
  );
};

export default GamePage;
