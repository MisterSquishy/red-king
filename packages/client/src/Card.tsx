import { Box, useColorModeValue } from "@chakra-ui/react";
import { Card as CardIF } from "./types";
import React from "react";

interface Props {
  card: CardIF;
  exposed?: boolean;
  onClick?: () => void;
}

const Card = ({ card, exposed, onClick }: Props) => {
  const backgroundColor = useColorModeValue("gray.200", "white");

  return exposed ? (
    <Box
      w="72px"
      h="100px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
    >
      this is where julie's sick illustrations go
    </Box>
  ) : (
    <Box
      w="72px"
      h="100px"
      bg={backgroundColor}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
    />
  );
};

export default Card;
