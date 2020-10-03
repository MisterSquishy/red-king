import React, { useContext, useEffect, useState } from 'react'
import socketIOClient from "socket.io-client";
import config from "../../config"

import { GameContext } from '../../App'

export default () => {
  const [game, setGame] = useState({});
  const { userName, gameId } = useContext(GameContext);

  useEffect(() => {
    const socket = socketIOClient(config.ENDPOINT);
    socket.on('connect', function() {
      socket.emit('join', gameId);
    });
    socket.on("GameUpdate", (data: React.SetStateAction<{}>) => {
      setGame(data);
    });
    return () => { socket.close() };
  }, [gameId]);

  return <>
    <h1>
      Hey
    </h1>
    <div>
      { userName }, you are ready to rumble in { gameId }
    </div>
    <code>
      <pre>
        {JSON.stringify(game, null, 2) }
      </pre>
    </code>
  </>
}