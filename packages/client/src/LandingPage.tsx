import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { fetcher } from "./api";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { DraftGame } from "./types";
import { VStack, Grid, Flex, Heading } from "@chakra-ui/react";
import JoinGameModal from "./JoinGameModal";
import CreateGameModal from "./CreateGameModal";
import React, { useState } from "react";

const setName = (gameId: string, name: string) => {
  window.localStorage.setItem(
    "game",
    JSON.stringify({
      ...JSON.parse(window.localStorage.getItem("game") ?? "{}"),
      [gameId]: name,
    })
  );
};

const LandingPage: React.FC = () => {
  const [joinGameModalOpen, setJoinGameModalOpen] = useState(false);
  const [createGameModalOpen, setCreateGameModalOpen] = useState(false);
  const history = useHistory();

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

  const findWaitingGames = () =>
    fetcher("/games/query", {
      method: "POST",
      body: JSON.stringify({ state: 0 }),
    }).then((res) => res.json());

  return (
    <>
      <JoinGameModal
        isOpen={joinGameModalOpen}
        findWaitingGames={findWaitingGames}
        onJoin={(gameId: string, userName: string) => {
          joinGame(gameId, userName);
          setName(gameId, userName);
          setJoinGameModalOpen(false);
          history.push(`/${gameId}`);
        }}
        onClose={() => setJoinGameModalOpen(false)}
      />
      <CreateGameModal
        isOpen={createGameModalOpen}
        onCreate={async (game) => {
          setCreateGameModalOpen(false);
          const { gameId } = await createGame(game);
          setName(gameId, game.userName);
          history.push(`/${gameId}`);
        }}
        onClose={() => setCreateGameModalOpen(false)}
      />
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
          <VStack spacing={5}>
            <Button
              colorScheme="red"
              onClick={() => setJoinGameModalOpen(true)}
            >
              Join Game
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => setCreateGameModalOpen(true)}
            >
              Host Game
            </Button>
          </VStack>
        </Grid>
      </Flex>
    </>
  );
};

export default LandingPage;
