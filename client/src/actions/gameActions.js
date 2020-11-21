import { DROP_TILE} from "./types";
// when someones clicks on a column
export function dropTile(col, row, color) {
    return {
        type: DROP_TILE,
        payload: {col, row, color},
    }
};