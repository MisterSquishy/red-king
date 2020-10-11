import React from 'react'
import { CardName } from 'typedeck';
import { Game } from '../../../models/interfaces'

export default ({
  game,
  userName
}: {
  game: Game
  userName?: string
}) => {
  const finalScores = game.players.reduce((map, player) => {
    map.set(player.name, player.hand.cards.map(card => parseInt(CardName[card.cardName], 10) + 1).reduce((total, card) => total + card));
    return map;
  }, new Map<string, number>());

  const iWon = finalScores.get(userName || '') === Math.min(...finalScores.values())

  return <>
    <h1>{`${iWon ? 'YOU WON' : 'You didn\'t win'}`}</h1>
    { Array.from(finalScores.entries()).map(playerScore => {
        return <p key={playerScore[0]}>{ playerScore[0] }: { playerScore[1] }</p>
    })}
  </>
}