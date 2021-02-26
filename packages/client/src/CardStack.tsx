import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import ClickArea from "./ClickArea";
import { Card as CardIF } from "./types";
import Card from "./Card";

interface Props {
  cardsToRender: number;
  onClick?: () => void;
  topCard?: CardIF;
}

const CardStack = ({ cardsToRender, onClick, topCard }: Props) => {
  const backgroundColor = useColorModeValue("gray.200", "white");
  const borderColor = useColorModeValue("black", "white");

  return cardsToRender > 0 ? (
    <Stack direction={["column", "row"]} spacing="-75">
      {Array.from({ length: cardsToRender }, (_, k) => (
        <Box
          key={k}
          w="72px"
          h="109px"
          bg={backgroundColor}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          shadow="md"
        />
      ))}
      {topCard ? (
        <Card card={topCard} exposed={true} onClick={onClick} />
      ) : (
        <Card />
      )}
      {onClick && !topCard && (
        <ClickArea onClick={onClick} prompt="Draw card" />
      )}
    </Stack>
  ) : (
    <Box
      w="72px"
      h="100px"
      borderWidth="1px"
      borderRadius="lg"
      borderStyle="dashed"
      borderColor={borderColor}
    >
      {onClick && <ClickArea onClick={onClick} prompt="Draw card" />}
    </Box>
  );
};

export default CardStack;
