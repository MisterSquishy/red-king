import { Box, Image } from "@chakra-ui/react";
import { SideEffectsContext } from "./GamePage";
import { Card as CardIF } from "./types";
import React, { useContext } from "react";
import ClickArea from "./ClickArea";

interface Props {
  card?: CardIF;
  exposed?: boolean;
  onClick?: () => void;
}

const Card = ({ card, exposed, onClick }: Props) => {
  const [sideEffectsState] = useContext(SideEffectsContext);
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

  return exposed && card ? (
    <Box w="72px" h="109px">
      <Image src={toSvgSrc(toSvgName(card))} />
      {onClick && <ClickArea onClick={onClick} prompt="Select card" />}
    </Box>
  ) : (
    <Box w="72px" h="109px">
      <Image src={toSvgSrc("Back")} />
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
