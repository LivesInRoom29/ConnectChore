export const createDefaultBoard = () => {
  const box = [];
  for (let y = 5; y >= 0; y--) {
    const row = [];
    for (let x = 0; x < 7; x++) {
      row.push({
        color: "white",
      });
    }

    box.push(row);
  }
  return box;
};

// export const play = (x) => {
//     if (!this.state.gameOver) {
//       // Place piece on board
//       let board = this.state.board;
//       for (let y = 5; y >= 0; y--) {
//         if (!board[y][x]) {
//           board[y][x] = this.state.currentPlayer;
//           break;
//         }
//       }

export const checkVertical = (board) => {
  // Check only if row is 3 or greater
  for (let y = 3; y < 6; y++) {
    console.log("y =", y);
    for (let x = 0; x < 7; x++) {
      console.log("x = ", x);
      if (board[y][x]) {
        if (
          board[y][x] === board[y - 1][x] &&
          board[y][x] === board[y - 2][x] &&
          board[y][x] === board[y - 3][x]
        ) {
          return board[y][x];
        }
      }
    }
  }
};
export const checkHorizontal = (board) => {
  // Check only if column is 3 or less
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 4; x++) {
      if (board[y][x]) {
        if (
          board[y][x] === board[y][x + 1] &&
          board[y][x] === board[y][x + 2] &&
          board[y][x] === board[y][x + 3]
        ) {
          return board[y][x];
        }
      }
    }
  }
};

export const checkDiagonalRight = (board) => {
  // Check only if row is 3 or greater AND column is 3 or less
  for (let y = 3; y < 6; y++) {
    for (let x = 0; x < 4; x++) {
      if (board[y][x]) {
        if (
          board[y][x] === board[y - 1][x + 1] &&
          board[y][x] === board[y - 2][x + 2] &&
          board[y][x] === board[y - 3][x + 3]
        ) {
          return board[y][x];
        }
      }
    }
  }
};

export const checkDiagonalLeft = (board) => {
  // Check only if row is 3 or greater AND column is 3 or greater
  for (let y = 3; y < 6; y++) {
    for (let x = 3; x < 7; x++) {
      if (board[y][x]) {
        if (
          board[y][x] === board[y - 1][x - 1] &&
          board[y][x] === board[y - 2][x - 2] &&
          board[y][x] === board[y - 3][x - 3]
        ) {
          return board[y][x];
        }
      }
    }
  }
};

//       export const checkAll = (board) => {
//         return (
//           checkVertical(board)
//         );
//       };
//     }

//     // this.checkHorizontal(board),
//     // this.checkDiagonalLeft(board),
//     // this.checkDiagonalRight(board)
