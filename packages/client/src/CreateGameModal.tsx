import { Button } from "@chakra-ui/react";
import { Game } from "./types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Grid
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (game: Game) => void;
}

const CreateGameModal: React.FC<Props> = ({ isOpen, onClose, onCreate }) => {
  const [game, setGame] = useState<Game>({ userName: "", gameName: "" });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Host a game</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid gridGap="5">
            <FormControl id="first-name" isRequired>
              <FormLabel>Game name</FormLabel>
              <Input
                onChange={e => setGame({ ...game, gameName: e.target.value })}
                placeholder="Some game"
              />
            </FormControl>
            <FormControl id="first-name" isRequired>
              <FormLabel>Your name</FormLabel>
              <Input
                placeholder="Peter Davids"
                onChange={e => setGame({ ...game, userName: e.target.value })}
              />
            </FormControl>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={() => onCreate(game)}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateGameModal;
