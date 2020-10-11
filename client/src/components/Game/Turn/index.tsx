import React from 'react'
import { Game } from '../../../models/interfaces'
import MyTurn from './MyTurn'

export default ({
  game,
  userName,
  onDraw,
  onDiscard,
  onDiscardAndFinish
}: {
  game: Game
  userName?: string
  onDraw: Function
  onDiscard: Function
  onDiscardAndFinish: Function
}) => {
  const currentPlayer = game.players[game.currentPlayer];
  const isMine = game && currentPlayer.name === userName
  const myHand = game.players.find(player => player.name === userName)?.hand

  return <>
    { !isMine && <>
      <p>Waiting on {currentPlayer.name}...</p>
    </> }
    { isMine && <>
      <p>Make your move!</p>
    </> }
    <h2>Top of discard pile:</h2>
    { game.discardPile.cards.length ?
      `${game.discardPile.cards[0].cardName} of ${game.discardPile.cards[0].suit}` :
      'No discard pile yet'
    }
    <h2>Your hand:</h2>
    { myHand?.cards.map(card => <p key={JSON.stringify(card)}>{card.cardName} of {card.suit}</p>) }
    { isMine &&
      <MyTurn
        onDiscard={onDiscard}
        onDraw={onDraw}
        onDiscardAndFinish={onDiscardAndFinish}
        hand={myHand}
        hasDiscard={game.discardPile.cards.length > 0} />
    }
  </>
}