import React, { useState } from "react";

import { Context } from './gameContext'
import CreateRoom from './components/CreateRoom';
import CreateUser from "./components/CreateUser";
import Room from "./components/Room";

export const GameContext = React.createContext({} as Context);

function App() {
  const [ userName, setUserName ] = useState();
  const [ roomId, setRoomId ] = useState();

  return <GameContext.Provider value={{ userName, setUserName, roomId, setRoomId }}>
    { !userName && <CreateUser /> }
    { userName && !roomId && <CreateRoom /> }
    { userName && roomId && <Room /> }
  </GameContext.Provider>;
}

export default App;