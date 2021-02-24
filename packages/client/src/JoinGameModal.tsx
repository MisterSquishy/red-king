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
  Link
} from "@chakra-ui/react";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onJoin: () => void;
}

const JoinGameModal: React.FC<Props> = ({ isOpen, onClose, onJoin }) => {
  const games = [
    { name: "Pete's game", players: 1 },
    { name: "RJ's world", players: 2 },
    { name: "Freja's kingdom", players: 4 },
    { name: "Julie's domain", players: 3 }
  ];
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
              {games.map(game => (
                <Radio value={game.name}>
                  {game.name} ({game.players} player)
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
