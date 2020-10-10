import React, { useContext } from 'react'

import { GameContext, PlayerContext, SocketContext } from '../../App'
import { GameState, DrawType } from '../../models/interfaces';
import WaitingRoom from './WaitingRoom'
import Turn from './Turn'

export default () => {
  const { userName, gameId } = useContext(PlayerContext);
  const socket = useContext(SocketContext);
  const { game, gameState } = useContext(GameContext);

  const onStart = () => {
    if(game) {
      game.currentPlayer = game?.players[0];
      socket.emit('GameUpdate', gameId, game)
      socket.emit('StateChange', gameId, GameState.IN_PROGRESS);
    }
  }

  const onDraw = (type: DrawType) => {

  }

  const onDiscard = () => {
    if(game) {

      // rotate turn
      const currentPlayerIndex = game.players.findIndex(player => player.name === game.currentPlayer?.name);
      game.currentPlayer = game.players[(currentPlayerIndex + 1) % game.players.length]
      socket.emit('GameUpdate', gameId, game)
    }
  }

  return <>
    { gameState === GameState.WAITING &&
      <WaitingRoom
        userName={userName}
        gameId={gameId}
        game={game}
        onStart={onStart} /> }
    { gameState === GameState.IN_PROGRESS && game &&
      <Turn
        game={game}
        userName={userName}
        onDraw={onDraw}
        onDiscard={onDiscard} /> }
  </>
}