import React, { useState } from "react";

import { Context } from './gameContext'
import CreateGame from './components/CreateGame';
import CreateUser from "./components/CreateUser";
import Game from "./components/Game";

export const GameContext = React.createContext({} as Context);

function App() {
  const [ userName, setUserName ] = useState();
  const [ gameId, setGameId ] = useState();

  return <GameContext.Provider value={{ userName, setUserName, gameId, setGameId }}>
    { !userName && <CreateUser /> }
    { userName && !gameId && <CreateGame /> }
    { userName && gameId && <Game /> }
  </GameContext.Provider>;
}

export default App;