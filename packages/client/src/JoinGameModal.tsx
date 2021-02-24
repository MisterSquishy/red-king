import { Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Radio,
  RadioGroup,
  Box,
  Stack,
  Link,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Game } from "./types";

interface Props {
  isOpen: boolean;
  findWaitingGames: () => Promise<Game[]>;
  onClose: () => void;
  onJoin: () => void;
}

const JoinGameModal: React.FC<Props> = ({
  isOpen,
  findWaitingGames,
  onClose,
  onJoin,
}) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    findWaitingGames().then(console.log);
  }, [findWaitingGames, setGames]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Join a game!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb="5">Here are some games waiting for players....</Box>
          <RadioGroup>
            <Stack spacing={5} direction="column">
              {games.map((game: Game) => (
                <Radio value={game.gameName}>
                  {game.gameName} ({game.userName} player)
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={onJoin}>
            Join
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JoinGameModal;
