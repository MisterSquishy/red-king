import React, { useContext } from 'react'

import { GameContext, PlayerContext, SocketContext } from '../../App'
import { GameState, DrawType, Card } from '../../models/interfaces';
import WaitingRoom from './WaitingRoom'
import Turn from './Turn'
import { discard, draw } from '../../api';

export default () => {
  const { userName, gameId } = useContext(PlayerContext);
  const socket = useContext(SocketContext);
  const { game, gameState } = useContext(GameContext);

  const onStart = () => {
    socket.emit('StateChange', gameId, GameState.IN_PROGRESS);
  }

  const onDraw = (type: DrawType) => {
    gameId && userName && draw(gameId, userName, type);
  }

  const onDiscard = (card: Card) => {
    gameId && userName && discard(gameId, userName, card);
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