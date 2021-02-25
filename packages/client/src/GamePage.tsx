import useSocket from "./hooks/useSocket";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DeckArea from "./DeckArea";
import { Game } from "./types";
import { Center, Grid, GridItem, Spinner, VStack } from "@chakra-ui/react";
import HUD from "./Hud";
import HandArea from "./HandArea";

export const GameContext = React.createContext({} as Game);
export const PlayerContext = React.createContext("");

const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [connected, socket] = useSocket();
  const name = JSON.parse(window.localStorage.getItem("game") ?? "{}")[gameId];
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    if (connected) {
      socket.on("GameUpdate", setGame);
      socket.emit("join", gameId);
    }
  }, [connected, gameId, socket, setGame]);

  return (
    <PlayerContext.Provider value={name}>
      {!game ? (
        <Spinner size="xl" />
      ) : (
        <GameContext.Provider value={game}>
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
                  <DeckArea />
                  <HUD />
                </VStack>
              </Center>
            </GridItem>
            <GridItem rowSpan={2} colSpan={1} bg="papayawhip" />
            <GridItem colSpan={3} bg="papayawhip">
              <Center>
                <HandArea playerName={name} />
              </Center>
            </GridItem>
          </Grid>
        </GameContext.Provider>
      )}
    </PlayerContext.Provider>
  );
};

export default GamePage;
