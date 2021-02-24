import { Button } from "@chakra-ui/react";
import { VStack, Grid, Box, Heading } from "@chakra-ui/react";
import JoinGameModal from "./JoinGameModal";
import React, { useState } from "react";

const LandingPage: React.FC = () => {
  const [joinGameModalOpen, setJoinGameModalOpen] = useState(false);

  return (
    <>
      <JoinGameModal
        isOpen={joinGameModalOpen}
        onJoin={() => setJoinGameModalOpen(false)}
        onClose={() => setJoinGameModalOpen(false)}
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
            <Button colorScheme="red" variant="outline">
              Host Game
            </Button>
          </VStack>
        </Grid>
      </Box>
    </>
  );
};

export default LandingPage;
