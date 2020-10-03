import React, { useContext } from 'react'

import { GameContext } from '../../App'
import { createGame } from '../../api'

export default () => {

  const { userName, setGameId } = useContext(GameContext)

  const createGameHandler = () => {
    createGame(userName || '')
      .then(resp => setGameId(resp.data.gameId))
      .catch(console.error)
  }

  return <>
    <h1>
      Wanna make a game?
    </h1>
    <button onClick={createGameHandler}>
      Make game
    </button>
    <p>
      do it { userName }
    </p>
  </>
}