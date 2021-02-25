import { Button } from "@chakra-ui/react";
import { DraftGame } from "./types";
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
  FormErrorMessage,
  Input,
  Grid,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (game: DraftGame) => void;
}

const CreateGameModal: React.FC<Props> = ({ isOpen, onClose, onCreate }) => {
  const [game, setGame] = useState<DraftGame>({
    userName: "",
    gameName: "",
  });
  const [showValidation, setShowValidation] = useState(false);
  const validUserName = !!game.userName;
  const validGameName = !!game.gameName;
  const validationPassed = validUserName && validGameName;

  useEffect(() => {
    setGame({ userName: "", gameName: "" });
    setShowValidation(false);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Host a game</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid gridGap="5">
            <FormControl
              id="gameName"
              isRequired
              isInvalid={!validGameName && showValidation}
            >
              <FormLabel>Game name</FormLabel>
              <Input
                onChange={(e) => setGame({ ...game, gameName: e.target.value })}
                placeholder="Some game"
              />
              <FormErrorMessage>Game name is required</FormErrorMessage>
            </FormControl>
            <FormControl
              id="name"
              isRequired
              isInvalid={!validUserName && showValidation}
            >
              <FormLabel>Your name</FormLabel>
              <Input
                placeholder="Peter Davids"
                onChange={(e) => setGame({ ...game, userName: e.target.value })}
              />
              <FormErrorMessage>Name is required</FormErrorMessage>
            </FormControl>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              if (validationPassed) {
                onCreate(game);
              } else {
                setShowValidation(true);
              }
            }}
          >
            Host
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateGameModal;
