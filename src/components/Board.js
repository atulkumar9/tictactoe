import React, { useState } from "react";
import Cell from "./Cell";
import {
  makeInitialBoard,
  validator,
  checkIfBoardIsFilled,
} from "../utils/utils";
import {
  STRIKER,
  PLAYER_1,
  PLAYER_2,
  DRAW_MESSAGE,
} from "../constants/constants";

const Board = ({ n }) => {
  const [value, setValue] = useState(makeInitialBoard(n));
  const [lastPlayed, setLastValue] = useState(null);
  const [winner, setWinner] = useState(null);
  const [nextPlayer, setNextPlayer] = useState(PLAYER_1);
  const [isDraw, setIsDraw] = useState(false);
  const [showWinningCells, setShowWinningCells] = useState(false);

  const play = (colI, rowI, val) => {
    if (winner) return;
    if (value[rowI][colI].value) return;
    value[rowI][colI] = { value: val, isWinningCell: false };
    setValue(value);
    if (validator(value, n)) {
      setWinner(nextPlayer);
      setShowWinningCells(true);
      return;
    }
    if (checkIfBoardIsFilled(value, n)) {
      setIsDraw(true);
      return;
    }
    let nextplyr = val === STRIKER.ZERO ? PLAYER_2 : PLAYER_1;
    setNextPlayer(nextplyr);
    setLastValue(val);
  };

  const resetBoard = () => {
    setValue(makeInitialBoard(n));
    setWinner("");
    setNextPlayer(PLAYER_1);
    setIsDraw(false);
    setLastValue(null);
    setShowWinningCells(false);
  };

  return (
    <>
      <div className="board">
        {value.map((rowArray, rowI) => {
          return (
            <span className="row">
              {rowArray.map((item, colI) => {
                return (
                  <Cell
                    value={item}
                    play={play}
                    rowI={rowI}
                    colI={colI}
                    lastPlayed={lastPlayed}
                    showWinningCells={showWinningCells}
                  />
                );
              })}
            </span>
          );
        })}
      </div>
      <button className={"reset__button"} onClick={resetBoard}>
        Reset
      </button>
      {winner ? (
        <h2>{`${winner} Wins 🙌🎉`}</h2>
      ) : isDraw ? (
        <h2>{DRAW_MESSAGE}</h2>
      ) : (
        <h3>{`${nextPlayer}'s Turn`}</h3>
      )}
    </>
  );
};

export default Board;
