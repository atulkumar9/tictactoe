import React from "react";
import { STRIKER } from "../constants/constants";

const Cell = ({ value, play, lastPlayed, colI, rowI, showWinningCells }) => {
  const onCellClick = () => {
    const striker = lastPlayed === STRIKER.ZERO ? STRIKER.CROSS : STRIKER.ZERO;
    play(colI, rowI, striker);
  };
  return (
    <div
      className={`cell ${
        showWinningCells && value.isWinningCell ? "winning__cell" : ""
      }`}
      onClick={onCellClick}
    >
      <span>{value.value}</span>
    </div>
  );
};

export default Cell;
