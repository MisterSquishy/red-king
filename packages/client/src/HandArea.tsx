import { Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import { GameContext, PlayerContext } from "./GamePage";

const HandArea = () => {
  const game = useContext(GameContext);
  const player = useContext(PlayerContext);
  return <Heading>{player}</Heading>;
};

export default HandArea;
