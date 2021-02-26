import { Box, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
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
    <Stack direction={["column", "row"]} spacing="-90px">
      {Array.from({ length: cardsToRender }, (_, k) => (
        <Box
          key={k}
          w="88px"
          h="136px"
          bg={backgroundColor}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          shadow="md"
        />
      ))}
      {topCard ? (
        <Card
          card={topCard}
          exposed={true}
          onClick={onClick}
          prompt="Draw card"
        />
      ) : (
        <Card onClick={onClick} prompt="Draw card" />
      )}
    </Stack>
  ) : (
    <Flex
      w="88px"
      h="136px"
      borderWidth="1px"
      borderRadius="lg"
      borderStyle="dashed"
      borderColor={borderColor}
      alignItems="center"
      justifyContent="center"
    >
      {onClick && <ClickArea onClick={onClick} prompt="Discard card" />}
    </Flex>
  );
};

export default CardStack;
