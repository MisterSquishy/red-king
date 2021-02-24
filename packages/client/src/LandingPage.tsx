import { Button, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Game } from "./types";
import { VStack, Grid, Flex, Heading, useColorMode } from "@chakra-ui/react";
import JoinGameModal from "./JoinGameModal";
import CreateGameModal from "./CreateGameModal";
import React, { useState } from "react";

const LandingPage: React.FC = () => {
  const [joinGameModalOpen, setJoinGameModalOpen] = useState(false);
  const [createGameModalOpen, setCreateGameModalOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const createGame = (game: Game) =>
    fetch("/games", {
      method: "POST",
      body: JSON.stringify(game),
    }).then((res) => res.json());

  const joinGame = (gameId: string) =>
    fetch(`/games/${gameId}`, {
      method: "POST",
      body: JSON.stringify({ userName: "kevin" }), //todo names
    }).then((res) => res.json());

  const findWaitingGames = () =>
    fetch("/games/query", {
      method: "POST",
      body: JSON.stringify({ state: 0 }), // todo GameState.WAITING })
    }).then((res) => res.json());

  return (
    <>
      <JoinGameModal
        isOpen={joinGameModalOpen}
        findWaitingGames={findWaitingGames}
        onJoin={(gameId: string) => {
          joinGame(gameId);
          setJoinGameModalOpen(false);
        }}
        onClose={() => setJoinGameModalOpen(false)}
      />
      <CreateGameModal
        isOpen={createGameModalOpen}
        onCreate={(game) => {
          createGame(game);
          setCreateGameModalOpen(false);
        }}
        onClose={() => setCreateGameModalOpen(false)}
      />
      <Flex
        height="100vh"
        minHeight="100vh"
        maxHeight="100vh"
        flexDirection="column"
      >
        <IconButton
          position="absolute"
          variant="ghost"
          right="5"
          mt="5"
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          onClick={toggleColorMode}
          aria-label="Switch to dark / light mode"
        />
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
