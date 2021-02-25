import { Button, Text } from "@chakra-ui/react";
import { GameState } from "shared";
import { useContext } from "react";
import { fetcher } from "./api";
import { GameContext } from "./GamePage";

const HUD = () => {
  const game = useContext(GameContext);
  const startGame = () =>
    fetcher(`/games/${game._id}/state`, {
      method: "PATCH",
      body: JSON.stringify({ state: GameState.IN_PROGRESS })
    }).then(res => res.json());

  return (
    <Text bg="lightgrey" w="100%" align="center">
      This is the game
      <Button onClick={startGame}>get cookin</Button>
    </Text>
  );
};

export default HUD;
