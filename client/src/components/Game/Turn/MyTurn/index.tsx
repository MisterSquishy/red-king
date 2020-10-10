import React, { useState } from 'react'
import Select from 'react-select'

import { DrawType, Hand } from '../../../../models/interfaces'

type CardOption = {label: string, value: number}

export default ({
  onDraw,
  onDiscard,
  hand
}: {
  onDraw: Function
  onDiscard: Function
  hand?: Hand
}) => {
  const [ selectedCard, setSelectedCard ] = useState<number>(0);

  return <>
    { hand && <>
      <Select
          label='discard'
          options={hand.cards.map((card, index) => {
            return {
              value: index,
              label: `${card.cardName} of ${card.suit}`
            } as CardOption
          })}
          value={{value: selectedCard, label: `${hand.cards[selectedCard]?.cardName || '-'} of ${hand.cards[selectedCard].suit}`} as CardOption}
          onChange={selectedOption => setSelectedCard((selectedOption as CardOption).value || 0)}
      />
      <button disabled={hand.cards.length > 4} onClick={() => onDraw(DrawType.DECK)}>draw from deck</button>
      <button disabled={hand.cards.length > 4}  onClick={() => onDraw(DrawType.DISCARD)}>draw from discard</button>
      <button disabled={hand.cards.length < 5} onClick={() => onDiscard(hand.cards[selectedCard])}>discard</button>
    </>}
  </>
}