export const makeInitialBoard = (n) => {
  const cellsRow = Array(n).fill("");
  const cellColumns = Array(n).fill("");
  return cellColumns.map(() => {
    return cellsRow.map(() => {
      return { value: null, isWinningCell: false };
    });
  });
};

const validateRows = (board, n) => {
  let count = 0,
    i = 0,
    j = 0;
  let winningCells = [];
  while (i < n && j < n - 1) {
    if (board[i][j].value === board[i][j + 1].value && board[i][j].value) {
      winningCells.push({ i, j });
      winningCells.push({ i, j: j + 1 });
      count++;
      j++;
    } else {
      winningCells = [];
      count = 0;
      j = 0;
      i++;
    }
  }
  if (count === n - 1) {
    winningCells.forEach((indexes) => {
      board[indexes.i][indexes.j].isWinningCell = true;
    });
  }
  return count === n - 1;
};

const validateColumn = (board, n) => {
  let count = 0,
    j = 0,
    i = 0;
  let winningCells = [];
  while (i < n - 1 && j < n) {
    if (board[i][j].value === board[i + 1][j].value && board[i][j].value) {
      winningCells.push({ i, j });
      winningCells.push({ i: i + 1, j });
      count++;
      i++;
    } else {
      count = 0;
      i = 0;
      j++;
    }
  }
  if (count === n - 1) {
    winningCells.forEach((indexes) => {
      board[indexes.i][indexes.j].isWinningCell = true;
    });
  }
  return count === n - 1;
};

const validateDiagonal = (board, n) => {
  let diagonalL = board[0][0].value;
  let diagonalR = board[0][n - 1].value;

  let diagonalLcount = 0;
  let diagonalRcount = 0;
  let winningCellsR = [];
  let winningCellsL = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j && board[i][j].value === diagonalL && board[i][j].value) {
        diagonalLcount++;
        winningCellsL.push({ i, j });
      }
      if (
        i + j === n - 1 &&
        board[i][j].value === diagonalR &&
        board[i][j].value
      ) {
        winningCellsR.push({ i, j });
        diagonalRcount++;
      }
    }
  }
  if (diagonalLcount === n) {
    winningCellsL.forEach((indexes) => {
      board[indexes.i][indexes.j].isWinningCell = true;
    });
  }
  if (diagonalRcount === n) {
    winningCellsR.forEach((indexes) => {
      board[indexes.i][indexes.j].isWinningCell = true;
    });
  }
  return diagonalLcount === n || diagonalRcount === n;
};

export const validator = (board, n) => {
  return (
    validateColumn(board, n) ||
    validateRows(board, n) ||
    validateDiagonal(board, n)
  );
};

export const checkIfBoardIsFilled = (board, n) => {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!board[i][j].value) return false;
    }
  }
  return true;
};
