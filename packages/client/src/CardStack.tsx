import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const CardStack = ({ cardsToRender }: { cardsToRender: number }) => {
  const backgroundColor = useColorModeValue("gray.200", "white");
  const borderColor = useColorModeValue("black", "white");

  return cardsToRender > 0 ? (
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
  ) : (
    <Box
      w="72px"
      h="100px"
      borderWidth="1px"
      borderRadius="lg"
      borderStyle="dashed"
      borderColor={borderColor}
    />
  );
};

export default CardStack;
