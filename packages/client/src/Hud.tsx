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
              Ready to go
            </Text>
            <Spacer />
            <Button onClick={startGame}>Start game</Button>
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
            <Spacer />
            {!hasDrawn && <Button onClick={startEndGame}>End game</Button>}
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
                  <Button onClick={() => send("lookyMeDone")}>Done</Button>
                )}
              </Flex>
            ) : (
              "It's your turn! Do something!!!"
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
    <Box w="100%" backgroundColor={colorMode === "dark" ? "gray" : "white"}>
      {getHudState({
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
