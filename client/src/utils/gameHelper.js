export const createDefaultBoard = () => {
    const box = [];
    for (let y = 5; y >= 0; y--) {
      const row = [];
      for (let x = 0; x < 7; x++) {
        row.push({color: 'white'});
    }

      box.push(row);
    }
    return box;
}




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

//       // Check status of board
//       let result = this.checkAll(board);
//       if (result === this.state.player1) {
//         this.setState({ board, gameOver: true, message: 'Player 1 (red) wins!' });
//       } else if (result === this.state.player2) {
//         this.setState({ board, gameOver: true, message: 'Player 2 (yellow) wins!' });
//       } else if (result === 'draw') {
//         this.setState({ board, gameOver: true, message: 'Draw game.' });
//       } else {
//         this.setState({ board, currentPlayer: this.togglePlayer() });
//       }
//     } else {
//       this.setState({ message: 'Game over. Please start a new game.' });
//     }
//   }

//   export const checkVertical = (board) => {
//     // Check only if row is 3 or greater
//     for (let y = 3; y < 6; y++) {
//       for (let x = 0; x < 7; x++) {
//         if (board[y][x]) {
//           if (
//             board[y][x] === board[y - 1][x] &&
//             board[y][x] === board[y - 2][x] &&
//             board[y][x] === board[y - 3][x]
//           ) {
//             return board[y][x];
//           }
//         }
//       }
//     }
//   }

//   export const checkHorizontal = (board) => {
//     // Check only if column is 3 or less
//     for (let y = 0; y < 6; y++) {
//       for (let x = 0; x < 4; x++) {
//         if (board[y][x]) {
//           if (
//             board[y][x] === board[y][x + 1] &&
//             board[y][x] === board[y][x + 2] &&
//             board[y][x] === board[y][x + 3]
//           ) {
//             return board[y][x];
//           }
//         }
//       }
//     }
//   }

//   export const checkDiagonalRight = (board) => {
//     // Check only if row is 3 or greater AND column is 3 or less
//     for (let y = 3; y < 6; y++) {
//       for (let x = 0; x < 4; x++) {
//         if (board[y][x]) {
//           if (
//             board[y][x] === board[y - 1][x + 1] &&
//             board[y][x] === board[y - 2][x + 2] &&
//             board[y][x] === board[y - 3][x + 3]
//           ) {
//             return board[y][x];
//           }
//         }
//       }
//     }
//   }

//   export const checkDiagonalLeft = (board) => {
//     // Check only if row is 3 or greater AND column is 3 or greater
//     for (let y = 3; y < 6; y++) {
//       for (let x = 3; x < 7; x++) {
//         if (board[y][x]) {
//           if (
//             board[y][x] === board[y - 1][x - 1] &&
//             board[y][x] === board[y - 2][x - 2] &&
//             board[y][x] === board[y - 3][x - 3]
//           ) {
//             return board[y][x];
//           }
//         }
//       }
//     }
//   }

//   checkAll = (board) => {
//     return (
//       this.checkVertical(board) ||
//       this.checkDiagonalRight(board) ||
//       this.checkDiagonalLeft(board) ||
//       this.checkHorizontal(board)
//     );
//   };

