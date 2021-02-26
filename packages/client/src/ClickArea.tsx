import { Center, Circle, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  prompt: string;
  onClick: () => void;
}

const ClickArea = ({ prompt, onClick }: Props) => {
  return (
    <Flex alignItems="center" textAlign="center" position="absolute">
      <Circle
        w="80px"
        h="80px"
        bg="#FBEEEE"
        borderWidth="3px"
        borderColor="#732A2A"
        onClick={onClick}
        _hover={{
          cursor: "pointer",
        }}
      >
        <Center>
          <Text
            align="center"
            fontSize="20px"
            lineHeight="normal"
            fontWeight="bold"
            color="#732A2A"
            textTransform="none"
          >
            {prompt}
          </Text>
        </Center>
      </Circle>
    </Flex>
  );
};

export default ClickArea;
