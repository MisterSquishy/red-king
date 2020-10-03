import React from 'react'

import { GameContext } from '../../App'
import { createGame } from '../../api'

export default () => {
  const createGameHandler = (userName: string, setGameId: Function) => {
    createGame(userName)
      .then(resp => setGameId(resp.data.gameId))
      .catch(console.error)
  }

  return <GameContext.Consumer>
    {({userName, setGameId}) => (
      <>
        <h1>
          Wanna make a game?
        </h1>
        <button onClick={() => createGameHandler(userName || '', setGameId)}>
          Make game
        </button>
        <p>
          do it { userName }
        </p>
      </>
    )}
  </GameContext.Consumer>
}