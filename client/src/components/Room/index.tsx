import React, { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client";
import config from "../../config"

import { GameContext } from '../../App'

export default () => {
  const [game, setGame] = useState({});

  useEffect(() => {
    const socket = socketIOClient(config.ENDPOINT);
    socket.on("StartGame", (data: React.SetStateAction<{}>) => {
      setGame(data);
    });
    return () => { socket.close() };
  }, []);

  return <GameContext.Consumer>
    {({ userName, roomId }) => (
      <>
        <h1>
          Hey
        </h1>
        <div>
          { userName }, you are ready to rumble in { roomId }
        </div>
        <code>
          <pre>
            {JSON.stringify(game, null, 2) }
          </pre>
        </code>
      </>
    )}
  </GameContext.Consumer>
}