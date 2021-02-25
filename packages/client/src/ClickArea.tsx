import { Center, Circle, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  prompt: string;
  onClick: () => void;
}

const ClickArea = ({ prompt, onClick }: Props) => {
  return (
    <Flex alignItems="center" textAlign="center">
      <Circle
        w="60px"
        h="60px"
        bg="lightblue"
        onClick={onClick}
        _hover={{
          background: "blue.100",
          cursor: "pointer",
        }}
      >
        <Center>
          <Text align="center">{prompt}</Text>
        </Center>
      </Circle>
    </Flex>
  );
};

export default ClickArea;
