import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { SideEffectsContext } from "./GamePage";
import React, { useContext, useState } from "react";
import { GameState } from "shared";
import { fetcher } from "./api";
import { GameContext, PlayerContext } from "./GamePage";

const getHudState = ({
  gameId,
  isHost,
  gameState,
  currentPlayer,
  activePlayer,
  sideEffectsState,
  send,
  hasDrawn,
  startGame,
  startEndGame,
  endEndGame,
  endingPlayer,
}: {
  gameId: string;
  isHost: boolean;
  gameState: GameState;
  currentPlayer: string;
  activePlayer: string;
  sideEffectsState: any;
  send: any;
  hasDrawn: boolean;
  startGame: () => void;
  startEndGame: () => void;
  endEndGame: () => void;
  endingPlayer?: string;
}) => {
  switch (gameState) {
    case GameState.WAITING:
      if (isHost) {
        return (
          <Flex alignItems="center">
            <Text w="100%" align="center">
              Invite people using game code:{" "}
              <Text as="samp" padding="6px">
                {gameId}
              </Text>
            </Text>
            <Spacer />
            <Button
              onClick={startGame}
              bg="#732A2A"
              textColor="white"
              marginRight="20px"
            >
              Start game
            </Button>
          </Flex>
        );
      } else {
        return (
          <Text w="100%" align="center">
            Waiting for host to start the game
          </Text>
        );
      }
    case GameState.IN_PROGRESS:
      if (activePlayer === currentPlayer) {
        return (
          <Flex alignItems="center">
            <Text w="100%" align="center">
              It's your turn! Do something!!!
            </Text>
            {!hasDrawn && (
              <Button
                onClick={startEndGame}
                bg="#732A2A"
                textColor="white"
                marginRight="20px"
              >
                End game
              </Button>
            )}
          </Flex>
        );
      } else {
        return (
          <Text w="100%" align="center">
            {sideEffectsState.value === "lookyMeChoose" ||
            sideEffectsState.value === "lookyMeReveal" ? (
              <Flex justifyContent="space-between" alignItems="center" p="4">
                <Box>Look at one of your own cards</Box>
                {sideEffectsState.value === "lookyMeReveal" && (
                  <Button
                    onClick={() => send("lookyMeDone")}
                    bg="#732A2A"
                    textColor="white"
                    marginRight="20px"
                  >
                    Done
                  </Button>
                )}
              </Flex>
            ) : (
              `Waiting on ${activePlayer}`
            )}
          </Text>
        );
      }
    case 3: // todo GameState.FINISHING:
      if (activePlayer === endingPlayer) {
        endEndGame();
        return (
          <Text w="100%" align="center">
            Game over
          </Text>
        );
      } else if (activePlayer === currentPlayer) {
        return (
          <Text w="100%" align="center">
            Make your final move
          </Text>
        );
      } else {
        return (
          <Text w="100%" align="center">
            Waiting for {activePlayer}'s final turn
          </Text>
        );
      }
  }
  return <Text>go get em tiger</Text>;
};

const HUD = () => {
  const { colorMode } = useColorMode();
  const [sideEffectsState, send] = useContext(SideEffectsContext);
  const game = useContext(GameContext);
  const gameId = game._id;
  const currentPlayer = useContext(PlayerContext);
  const activePlayer = game.players[game.currentPlayer].name;
  const [endingPlayer, setEndingPlayer] = useState<string | undefined>();
  const isHost = currentPlayer === game.players[0].name;
  const hasDrawn = game.players[game.currentPlayer].hand.cards.length > 4;

  const updateGameState = (state: GameState) =>
    fetcher(`/games/${game._id}/state`, {
      method: "PATCH",
      body: JSON.stringify({ state }),
    }).then((res) => res.json());

  return (
    <Box
      w="100%"
      h="67px"
      lineHeight="67px"
      alignItems="center"
      backgroundColor={colorMode === "dark" ? "gray" : "white"}
      borderRadius="8px"
      filter="drop-shadow(0 4px 4px rgb(129, 61, 61, .05))"
    >
      {getHudState({
        gameId,
        isHost,
        gameState: game.state,
        currentPlayer,
        activePlayer: activePlayer,
        hasDrawn: hasDrawn,
        sideEffectsState,
        send,
        startGame: () => updateGameState(GameState.IN_PROGRESS),
        startEndGame: () => {
          setEndingPlayer(activePlayer);
          fetcher(`/games/${game._id}/end/turn`, {
            method: "POST",
            body: JSON.stringify({
              userName: currentPlayer,
            }),
          }).then(() => {
            updateGameState(3); // todo GameState.FINISHING
          });
        },
        endEndGame: () => updateGameState(GameState.FINISHED),
        endingPlayer: endingPlayer,
      })}
    </Box>
  );
};

export default HUD;
