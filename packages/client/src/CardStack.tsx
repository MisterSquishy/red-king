import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const CardStack = ({ cardsToRender }: { cardsToRender: number }) => {
  const backgroundColor = useColorModeValue("gray.200", "white");

  return (
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
  );
};

export default CardStack;
