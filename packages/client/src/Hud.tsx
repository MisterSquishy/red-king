import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { SideEffectsContext } from "./GamePage";
import React, { useContext } from "react";
import { GameState } from "shared";
import { fetcher } from "./api";
import { GameContext, PlayerContext } from "./GamePage";

const getHudState = ({
  isHost,
  gameState,
  currentPlayer,
  activePlayer,
  sideEffectsState,
  turnStage,
  startGame
}: {
  isHost: boolean;
  gameState: GameState;
  currentPlayer: string;
  activePlayer: string;
  sideEffectsState: any;
  turnStage: number; //todo
  startGame: () => void;
}) => {
  switch (gameState) {
    case GameState.WAITING:
      if (isHost) {
        return (
          <Flex>
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
          <Text w="100%" align="center">
            {sideEffectsState.value === "lookyMeChoose" ||
            sideEffectsState === "lookyMeReveal"
              ? "Look at one of your own cards"
              : "It's your turn! Do something!!!"}
          </Text>
        );
      } else {
        return (
          <Text w="100%" align="center">
            Waiting for {activePlayer}
          </Text>
        );
      }
  }
  return <Text>go get em tiger</Text>;
};

const HUD = () => {
  const [sideEffectsState] = useContext(SideEffectsContext);
  const game = useContext(GameContext);
  const currentPlayer = useContext(PlayerContext);
  const isHost = currentPlayer === game.players[0].name;

  const startGame = () =>
    fetcher(`/games/${game._id}/state`, {
      method: "PATCH",
      body: JSON.stringify({ state: GameState.IN_PROGRESS })
    }).then(res => res.json());

  return (
    <Box bg="lightgrey" w="100%">
      {getHudState({
        isHost,
        gameState: game.state,
        currentPlayer,
        activePlayer: game.players[game.currentPlayer].name,
        turnStage: 0, //todo
        sideEffectsState,
        startGame
      })}
    </Box>
  );
};

export default HUD;
