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
  Link,
  FormErrorMessage,
  Stack,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Game } from "./types";

interface Props {
  isOpen: boolean;
  findWaitingGames: () => Promise<Game[]>;
  onClose: () => void;
  onJoin: (gameId: string, userName: string) => void;
}

const JoinGameModal: React.FC<Props> = ({
  isOpen,
  findWaitingGames,
  onClose,
  onJoin,
}) => {
  const [games, setGames] = useState<Game[]>([]);
  const [userName, setUserName] = useState("");
  const [selectedGame, setSelectedGame] = useState<
    string | number | undefined
  >();
  const validName = !!userName;
  const validGame = !!selectedGame;
  const validationPassed = validGame && validName;
  const [showValidation, setShowValidation] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    findWaitingGames().then(setGames);
  }, [findWaitingGames]);

  useEffect(() => {
    setUserName("");
    setSelectedGame(undefined);
    setShowValidation(false);
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
            isInvalid={!validName && showValidation}
          >
            <FormLabel>Your name</FormLabel>
            <Input
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Peter Davids"
            />

            <FormErrorMessage>Your name is required</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!validGame && showValidation}>
            <FormLabel mb="5">Games (waiting for players)</FormLabel>
            <RadioGroup onChange={setSelectedGame} value={selectedGame}>
              <Stack spacing={5} p={2} overflow="auto" direction="column">
                {games.slice(page * 5, page * 5 + 5).map((game: Game) => (
                  <Radio value={game._id}>
                    {game.gameName} ({game.players.length}{" "}
                    {game.players.length === 1 ? "player" : "players"})
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
            <Flex m={2}>
              {page > 0 && (
                <Link onClick={() => setPage((p) => p - 1)} color="blue">
                  ← Prev
                </Link>
              )}
              {(page + 1) * 5 < games.length && (
                <Link
                  ml="auto"
                  onClick={() => setPage((p) => p + 1)}
                  color="blue"
                >
                  Next →
                </Link>
              )}
            </Flex>
            <FormErrorMessage>You must select a game</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            disabled={games.length === 0}
            onClick={() => {
              if (validationPassed) {
                onJoin(selectedGame?.toString() ?? "", userName);
              } else {
                setShowValidation(true);
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
