import { Box, Center, Image, Stack } from "@chakra-ui/react";
import { Card as CardIF } from "./types";
import React from "react";
import ClickArea from "./ClickArea";

interface Props {
  card?: CardIF;
  exposed?: boolean;
  onClick?: () => void;
  prompt?: string;
}

const Card = ({ card, exposed, onClick, prompt }: Props) => {
  const toSvgName = (card: CardIF): string => {
    // eslint-disable-next-line
    if (card.cardName == "13") {
      return "Joker_Black";
      // eslint-disable-next-line
    } else if (card.cardName == "14") {
      return "Joker_Red";
    } else {
      return `${card.cardName}_${card.suit}`;
    }
  };

  const toSvgSrc = (svgName: string): string => {
    const { default: svg } = require(`./images/${svgName}.svg`);
    return svg;
  };

  const svgName = exposed && card ? toSvgName(card) : "Back";

  return (
    <Box w="88px" h="136px">
      <Stack spacing="-50">
        <Image src={toSvgSrc(svgName)} />
        {onClick && (
          <Center>
            <ClickArea onClick={onClick} prompt={prompt || "Select card"} />
          </Center>
        )}
      </Stack>
    </Box>
  );
};

export default Card;
