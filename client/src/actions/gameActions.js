import { DROP_TILE} from "./types";
import { RESET_GAME } from "./types";
import { SET_WINNER } from "./types";
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

export function setWinner() {
    return{
        type: SET_WINNER,
    }
}