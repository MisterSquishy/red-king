import { useHistory } from "react-router-dom";
import { Button, Input } from "@chakra-ui/react";
import { fetcher } from "./api";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { DraftGame } from "./types";
import { VStack, Grid, Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import totemize from "totemize";

const setName = (gameId: string, name: string) => {
  window.localStorage.setItem(
    "game",
    JSON.stringify({
      ...JSON.parse(window.localStorage.getItem("game") ?? "{}"),
      [gameId]: name,
    })
  );
};

const createGame = (game: DraftGame) =>
  fetcher("/games", {
    method: "POST",
    body: JSON.stringify(game),
  }).then((res) => res.json());

const joinGame = (gameId: string, userName: string) =>
  fetcher(`/games/${gameId}`, {
    method: "POST",
    body: JSON.stringify({ userName }),
  }).then((res) => res.json());

const UndecidedOptions = ({
  setEntryState,
}: {
  setEntryState: (state: "create" | "join") => void;
}) => {
  const history = useHistory();
  return (
    <VStack spacing={5}>
      <Button
        colorScheme="red"
        width="xs"
        onClick={() => setEntryState("join")}
      >
        Join Game
      </Button>
      <Button
        colorScheme="red"
        variant="outline"
        width="xs"
        onClick={async () => {
          const userName = totemize();
          const { gameId } = await createGame({
            userName: userName,
            gameName: "unnamed game",
          });
          setName(gameId, userName);
          history.push(`/${gameId}`);
        }}
      >
        Host Game
      </Button>
    </VStack>
  );
};

const JoinOptions: React.FC = () => {
  const history = useHistory();
  const [gameToJoin, setGameToJoin] = useState("");
  return (
    <VStack spacing={5}>
      <Input
        placeholder="Enter game code"
        onChange={(e) => setGameToJoin(e.target.value)}
        autoFocus
      />
      <Button
        colorScheme="red"
        variant="outline"
        width="xs"
        onClick={() => {
          const userName = totemize();
          joinGame(gameToJoin, userName);
          setName(gameToJoin, userName);
          history.push(`/${gameToJoin}`);
        }}
      >
        Join Game
      </Button>
    </VStack>
  );
};

const LandingPage: React.FC = () => {
  const [entryState, setEntryState] = useState<"create" | "join" | undefined>();

  return (
    <>
      <Flex
        height="100vh"
        minHeight="100vh"
        maxHeight="100vh"
        flexDirection="column"
      >
        <DarkModeSwitcher />
        <Grid
          gridGap="10"
          gridTemplateColumns="auto"
          alignContent="center"
          justifyItems="center"
          height="100%"
        >
          <Heading>Welcome to Red Queen!</Heading>
          {!entryState && <UndecidedOptions setEntryState={setEntryState} />}
          {entryState === "join" && <JoinOptions />}
        </Grid>
      </Flex>
    </>
  );
};

export default LandingPage;
