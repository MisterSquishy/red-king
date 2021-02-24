import { Button } from "@chakra-ui/react";
import { Game } from "./types";
import { VStack, Grid, Box, Heading } from "@chakra-ui/react";
import JoinGameModal from "./JoinGameModal";
import CreateGameModal from "./CreateGameModal";
import React, { useState } from "react";

const LandingPage: React.FC = () => {
  const [joinGameModalOpen, setJoinGameModalOpen] = useState(false);
  const [createGameModalOpen, setCreateGameModalOpen] = useState(false);
  const createGame = (game: Game) =>
    fetch("/games", {
      method: "POST",
      body: JSON.stringify(game)
    }).then(res => res.json());

  return (
    <>
      <JoinGameModal
        isOpen={joinGameModalOpen}
        onJoin={() => setJoinGameModalOpen(false)}
        onClose={() => setJoinGameModalOpen(false)}
      />
      <CreateGameModal
        isOpen={createGameModalOpen}
        onCreate={game => {
          createGame(game);
          setCreateGameModalOpen(false);
        }}
        onClose={() => setCreateGameModalOpen(false)}
      />
      <Box height="100vh" minHeight="100vh">
        <Grid
          gridGap="10"
          gridTemplateColumns="auto"
          alignContent="center"
          justifyItems="center"
          height="100%"
        >
          <Heading>Welcome to Red Queen!</Heading>
          <VStack>
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
      </Box>
    </>
  );
};

export default LandingPage;
