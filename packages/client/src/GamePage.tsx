import useSocket from "./hooks/useSocket";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { sideEffectsMachine } from "./machines";
import { useMachine } from "@xstate/react";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DeckArea from "./DeckArea";
import { Game } from "./types";
import {
  Center,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Table,
  Td,
  Th,
  Tr,
  VStack,
  Box
} from "@chakra-ui/react";
import HUD from "./Hud";
import HandArea from "./HandArea";
import { GameState } from "shared";
import { getScore } from "./util/score";

export const SideEffectsContext = React.createContext<any>(null);
export const GameContext = React.createContext({} as Game);
export const PlayerContext = React.createContext("");

const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const machine = useMachine(sideEffectsMachine);
  const [connected, socket] = useSocket();
  const [game, setGame] = useState<Game>();
  const name = JSON.parse(window.localStorage.getItem("game") ?? "{}")[gameId];
  const otherPlayers =
    game?.players.filter(player => player.name !== name) || [];

  useEffect(() => {
    if (connected) {
      socket.on("GameUpdate", setGame);
      socket.emit("join", gameId);
    }
  }, [connected, gameId, socket, setGame]);

  return (
    <Box pt={20}>
      <DarkModeSwitcher />
      <SideEffectsContext.Provider value={machine}>
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
                <GridItem rowSpan={2} colSpan={1}>
                  {otherPlayers.length >= 1 && (
                    <HandArea playerName={otherPlayers[0].name} />
                  )}
                  {otherPlayers.length >= 3 && (
                    <HandArea playerName={otherPlayers[2].name} />
                  )}
                </GridItem>
                <GridItem colSpan={3}>
                  <Center>
                    {game.state === GameState.FINISHED ? (
                      <VStack>
                        <Heading as="h2">This game is OVA</Heading>
                        <Table>
                          <Tr>
                            <Th>Player</Th>
                            <Th>Final score</Th>
                          </Tr>
                          {game.players.map((player, index) => {
                            return (
                              <Tr key={index}>
                                <Td>{player.name}</Td>
                                <Td>{getScore(player.hand.cards)}</Td>
                              </Tr>
                            );
                          })}
                        </Table>
                      </VStack>
                    ) : (
                      <VStack w="100%">
                        <DeckArea />
                        <HUD />
                      </VStack>
                    )}
                  </Center>
                </GridItem>
                <GridItem rowSpan={2} colSpan={1}>
                  {otherPlayers.length >= 2 && (
                    <HandArea playerName={otherPlayers[1].name} />
                  )}
                  {otherPlayers.length >= 4 && (
                    <HandArea playerName={otherPlayers[3].name} />
                  )}
                </GridItem>
                <GridItem colSpan={3}>
                  <Center>
                    <HandArea playerName={name} />
                  </Center>
                </GridItem>
              </Grid>
            </GameContext.Provider>
          )}
        </PlayerContext.Provider>
      </SideEffectsContext.Provider>
    </Box>
  );
};

export default GamePage;
