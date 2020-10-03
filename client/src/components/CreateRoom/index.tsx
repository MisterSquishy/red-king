import React from 'react'

import { GameContext } from '../../App'
import { createRoom } from '../../api'

export default () => {
  const createRoomHandler = (setRoomId: Function) => {
    createRoom()
      .then(resp => setRoomId(resp.data.roomId))
      .catch(console.error)
  }

  return <GameContext.Consumer>
    {({roomId, setRoomId}) => (
      <>
        <h1>
          Wanna make a room?
        </h1>
        <button onClick={() => createRoomHandler(setRoomId)}>
          Make room
        </button>
        <p>
          You're in room { roomId }
        </p>
      </>
    )}
  </GameContext.Consumer>
}