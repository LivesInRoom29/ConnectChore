import { DROP_TILE } from "./types";

//when someone clicks on a column
export function dropTile(col) {
    return {
        type: DROP_TILE,
        payload: col
    }
}