import React, { useState } from "react";
import { PlayingCard } from "typedeck";
import { Game } from "../../../models/interfaces";
import Card from "../../Card";
import Hand from "../../Hand";
import MyTurn from "./MyTurn";

export default ({
  game,
  userName,
  drawnCard,
  onDraw,
  onDiscard,
  onDiscardAndFinish,
}: {
  game: Game;
  userName?: string;
  drawnCard?: PlayingCard;
  onDraw: Function;
  onDiscard: Function;
  onDiscardAndFinish: Function;
}) => {
  const currentPlayer = game.players[game.currentPlayer];
  const isMine = game && currentPlayer.name === userName;
  const myHand = game.players.find((player) => player.name === userName)?.hand;
  const [selectedCard, setSelectedCard] = useState<number>(0);

  return (
    <>
      {!isMine && (
        <>
          <p>Waiting on {currentPlayer.name}...</p>
        </>
      )}
      {isMine && (
        <>
          <p>Make your move!</p>
        </>
      )}
      <h2>Top of discard pile:</h2>
      {game.discardPile.cards.length ? (
        <Card card={game.discardPile.cards[0]} hidden={false} />
      ) : (
        "No discard pile yet"
      )}
      <h2>Your hand:</h2>
      {myHand && (
        <Hand
          hand={myHand}
          shownCards={drawnCard ? [drawnCard] : []}
          selectable={isMine && !!drawnCard}
          onSelect={(card: PlayingCard) => {
            setSelectedCard(myHand.cards.indexOf(card));
          }}
          selectedCard={myHand.cards[selectedCard]}
        />
      )}
      {isMine && (
        <MyTurn
          onDiscard={onDiscard}
          onDraw={onDraw}
          onDiscardAndFinish={onDiscardAndFinish}
          hand={myHand}
          hasDiscard={game.discardPile.cards.length > 0}
          selectedCard={selectedCard}
        />
      )}
    </>
  );
};
