import React, { useState } from "react";

import { Context } from './gameContext'
import CreateRoom from './components/CreateRoom';
// import socketIOClient from "socket.io-client";
// import config from "./config"

export const GameContext = React.createContext({} as Context);

function App() {
  // const [game, setGame] = useState({});

  // useEffect(() => {
  //   const socket = socketIOClient(config.ENDPOINT);
  //   socket.on("StartGame", (data: React.SetStateAction<{}>) => {
  //     setGame(data);
  //   });
  //   return () => { socket.close() };
  // }, []);

  const [ userName, setUserName ] = useState();
  const [ roomId, setRoomId ] = useState();

  return <GameContext.Provider value={{ userName, setUserName, roomId, setRoomId }}>
    <CreateRoom />
  </GameContext.Provider>;
}

export default App;