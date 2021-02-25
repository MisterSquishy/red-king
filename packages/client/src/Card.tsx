import { Box, useColorModeValue } from "@chakra-ui/react";
import { SideEffectsContext } from "./GamePage";
import { Card as CardIF } from "./types";
import React, { useContext } from "react";
import ClickArea from "./ClickArea";

interface Props {
  card: CardIF;
  exposed?: boolean;
  onClick?: () => void;
}

const Card = ({ card, exposed, onClick }: Props) => {
  const [sideEffectsState] = useContext(SideEffectsContext);
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
      {card.cardName} of {card.suit}
      {onClick && <ClickArea onClick={onClick} prompt="Select card" />}
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
    >
      {onClick && (
        <ClickArea
          onClick={onClick}
          prompt={
            sideEffectsState.value === "lookyMeChoose" ? "Looky" : "Select card"
          }
        />
      )}
    </Box>
  );
};

export default Card;
