import React, { useContext } from "react";
import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import { GameContext } from "./GamePage";

const DeckArea = () => {
  const { game } = useContext(GameContext);
  const backgroundColor = useColorModeValue("gray.200", "white");
  const cardsToRender = Math.min(game.deck.cards.length, 6);
  return (
    <Box>
      <Stack direction={["column", "row"]} spacing="-75">
        {Array.from({ length: cardsToRender }, (_, k) => (
          <Box
            key={k}
            w="72px"
            h="100px"
            bg={backgroundColor}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            shadow="md"
          />
        ))}
      </Stack>
    </Box>
  );
};

export default DeckArea;
