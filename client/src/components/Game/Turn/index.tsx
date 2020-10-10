import React from 'react'
import { Game } from '../../../models/interfaces'

export default ({
  game,
  userName,
  onDraw,
  onDiscard
}: {
  game: Game
  userName?: string
  onDraw: Function
  onDiscard: Function
}) => {

  const isMine = game.currentPlayer?.name === userName
  const myHand = game.players.find(player => player.name === userName)?.hand

  return <>
    { isMine && <>
      Make your move
      <button onClick={e => onDiscard()}>done</button>
    </>}
    { !isMine && <>
      <p>Waiting on {game.currentPlayer?.name}...</p>
    </>}
    <>
      <h2>Your hand:</h2>
      { myHand?.cards.map(card => <p key={JSON.stringify(card)}>{card.cardName} of {card.suit}</p>) }
    </>
  </>
}