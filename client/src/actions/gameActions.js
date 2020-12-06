import { DROP_TILE, SET_PLAYER, RESET_GAME, SET_WINNER} from "./types";

// when someones clicks on a column
export function dropTile(col, row, color) {
    return {
        type: DROP_TILE,
        payload: {col, row, color}
    }
};

export function resetGame() {
    return {
        type: RESET_GAME,
    }
};

export function setPlayer(player, color) {
    return {
        type: SET_PLAYER,
        payload: {player, color}
    }
};

// export function setWinner(player, reward) {
//     return{
//         type: SET_WINNER,
//         payload: {player, reward}
//     }
// }