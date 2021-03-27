import { Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (gameId: string, userName: string) => void;
}

const JoinGameModal: React.FC<Props> = ({ isOpen, onClose, onJoin }) => {
  const [userName, setUserName] = useState("");
  const [gameId, setGameId] = useState("");
  const validName = !!userName;
  const validGame = !!gameId;
  const [showNameValidation, setShowNameValidation] = useState(false);
  const [showGameValidation, setShowGameValidation] = useState(false);

  useEffect(() => {
    setUserName("");
    setGameId("");
    setShowNameValidation(false);
    setShowGameValidation(false);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Join a game!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl
            id="userName"
            isRequired
            mb="5"
            isInvalid={!validName && showNameValidation}
          >
            <FormLabel>Your name</FormLabel>
            <Input
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Peter Davids"
            />

            <FormErrorMessage>Tell people your name!</FormErrorMessage>
          </FormControl>
          <FormControl
            id="gameId"
            isRequired
            mb="5"
            isInvalid={!validName && showGameValidation}
          >
            <FormLabel>Game to join</FormLabel>
            <Input
              onChange={(e) => setGameId(e.target.value)}
              placeholder="abc123"
            />
            <FormErrorMessage>What game do you want to join?</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            disabled={!validName || !validGame}
            onClick={() => {
              if (validName && validGame) {
                onJoin(gameId ?? "", userName);
              } else if (!validName) {
                setShowNameValidation(true);
              } else if (!validGame) {
                setShowGameValidation(true);
              }
            }}
          >
            Join
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JoinGameModal;
