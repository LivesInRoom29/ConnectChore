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



//       export const checkAll = (board) => {
//         return (
//           checkVertical(board)
//         );
//       };
//     }

//     // this.checkHorizontal(board),
//     // this.checkDiagonalLeft(board),
//     // this.checkDiagonalRight(board)
