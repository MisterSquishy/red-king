import React from "react";
import { PlayingCard } from "typedeck";
import { displayName } from "./util";
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
      })}
      onClick={() => clickable && onClick(card)}
    >
      {!hidden && displayName(card)}
    </div>
  );
};
