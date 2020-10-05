import React, { useContext, useEffect, useState } from 'react'
import socketIOClient from "socket.io-client";
import config from "../../config"

import { GameContext } from '../../App'
import { Game, Player } from '../../models/interfaces';

export default () => {
  const [game, setGame] = useState<Game | undefined>();
  const { userName, gameId } = useContext(GameContext);

  useEffect(() => {
    const socket = socketIOClient(config.ENDPOINT);
    socket.on('connect', function() {
      socket.emit('join', gameId);
    });
    socket.on("GameUpdate", (game: Game) => {
      setGame(game);
    });
    return () => { socket.close() };
  }, [gameId]);

  const player = game?.players.filter(player => player.name === userName)[0]
  const otherPlayers = game?.players.filter(player => player.name !== userName)

  return <>
    <h1>
      Hey
    </h1>
    <div>
      { userName }, you are ready to rumble in { gameId }
    </div>
    <h3>
      who the hell else is here?
    </h3>
    { otherPlayers && otherPlayers.length ? 
      otherPlayers.map((player: Player) => <p>{ player.name }</p>) :
      <p>nobody</p>
    }
    <h3>
      what's in my hand?
    </h3>
    { player ?
      player.hand.cards.map(card => <p>{card.cardName} of {card.suit}</p>) :
      <p>wait who even are you</p>
    }
  </>
}