import React from "react";
import { PlayingCard, Suit } from "typedeck";
import { displayIcon, displayName, isBlack } from "./util";
import classnames from "classnames";

import "./style.css";

export default ({
  card,
  hidden = true,
  clickable = false,
  onClick = () => {},
}: {
  card: PlayingCard;
  hidden?: boolean;
  clickable?: boolean;
  onClick?: Function;
}) => {
  return (
    <div
      key={JSON.stringify(card)}
      className={classnames("playing-card-container", {
        hidden,
        clickable,
        black: isBlack(+Suit[card.suit]),
      })}
      onClick={() => clickable && onClick(card)}
    >
      {!hidden && (
        <>
          {displayIcon(card)}
          <br />
          {displayName(card)}
          <br />
          {displayIcon(card)}
        </>
      )}
    </div>
  );
};
