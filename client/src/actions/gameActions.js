import { DROP_TILE, SELECT_PLAYER, RESET_GAME, SET_WINNER} from "./types";

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

export function selectPlayer() {
    return {
        type: SELECT_PLAYER,
        payload: {player, color}
    }
}
export function setWinner() {
    return{
        type: SET_WINNER,
        payload: {player, reward}
    }
}