import React, { useContext, useState } from 'react'

import { GameContext } from '../../App'
import { joinGame } from '../../api'

export default () => {

  const { userName, setGameId } = useContext(GameContext)
  const [ unsavedGameId, setUnsavedGameId ] = useState('')

  const joinGameHandler = () => {
    joinGame(userName || '', unsavedGameId)
      .then(resp => setGameId(resp.data.gameId))
      .catch(console.error)
  }

  return <>
    <h1>
      ...or wanna join a game?
    </h1>
    <input 
      onChange={ event => setUnsavedGameId(event.target.value) }
      value={ unsavedGameId }
    />
    <button onClick={joinGameHandler}>
      join game
    </button>
  </>
}