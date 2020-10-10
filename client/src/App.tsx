import React, { useState } from "react";
import socketIOClient from "socket.io-client";

import config from "./config"
import { PlayerContextIF, GameContextIF } from './contexts'
import CreateGame from './components/CreateGame';
import CreateUser from "./components/CreateUser";
import Game from "./components/Game";
import JoinGame from "./components/JoinGame";
import { Game as GameIF, GameState } from "./models/interfaces";

export const PlayerContext = React.createContext({} as PlayerContextIF);
export const SocketContext = React.createContext({} as SocketIOClient.Socket)
export const GameContext = React.createContext({} as GameContextIF)

function App() {
  const [ userName, setUserName ] = useState<string>();
  const [ gameId, setGameId ] = useState<string>();
  const [ game, setGame ] = useState<GameIF>({_id:'',players:[]});
  const [ gameState, setGameState ] = useState<GameState>(GameState.WAITING);

  const socket = socketIOClient(config.ENDPOINT);

  const setGameIdAndSubscribe = (gameId: string) => {
    setGameId(gameId)
    socket.on('GameUpdate', setGame);
    socket.on("StateChange", setGameState);
    socket.emit('join', gameId)
  }

  return <SocketContext.Provider value={socket}>
    <PlayerContext.Provider value={{ userName, setUserName, gameId, setGameId: setGameIdAndSubscribe }}>
      <GameContext.Provider value={{ game, gameState }}>
        { !userName && <CreateUser /> }
        { userName && !gameId && <CreateGame /> }
        { userName && !gameId && <JoinGame /> }
        { userName && gameId && <Game /> }
      </GameContext.Provider>
    </PlayerContext.Provider>
  </SocketContext.Provider>
}

export default App;