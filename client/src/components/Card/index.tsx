import React from "react";
import { PlayingCard } from "typedeck";
import { displayName } from "./util";
import classnames from "classnames";

import "./style.css";

export default ({
  card,
  hidden = true,
  showable = false,
  onShow,
}: {
  card: PlayingCard;
  hidden?: boolean;
  showable?: boolean;
  onShow: Function;
}) => {
  return (
    <div
      key={JSON.stringify(card)}
      className={classnames("playing-card-container", {
        hidden,
        showable,
      })}
      onClick={() => showable && onShow(card)}
    >
      {!hidden && displayName(card)}
    </div>
  );
};
