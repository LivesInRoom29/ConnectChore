import produce from 'immer';
import {createDefaultBoard} from "../utils/gameHelper";
import { DROP_TILE, RESET_GAME, SET_PLAYER, SET_WINNER } from "../actions/types";



export const initialGameState = {
    player1: 1,
    player2: 2,
    board: [
        [], //col 1
        [], //col 2
        [], //col 3
        [], //col 4
        [], //col 5
        [], //col 6
        [] //col 7
    ],
    clicks: 0,
    winner: null,
    box: createDefaultBoard()
};


const reducer = produce((state = initialGameState, action) => {
    
    switch (action.type) {
        case DROP_TILE: 
        console.log("dropping onto col" + action.payload);
        const {col} = action.payload;
        
        let dropToRow = state.box.length-1;
        state.box.some((currentRow, index) => {
            if (currentRow[col].color !== 'white') {
                dropToRow = index-1;
                return true;
            }
            return false;
        }) 
        console.log(dropToRow);
        state.box[dropToRow][col].color = 'red';
        
        if (state.clicks % 2 !== 0 ) {state.box[dropToRow][col].color = 'yellow'}
        state.clicks++
      
        return;
        case RESET_GAME:
            return state = initialGameState;
       
        case SET_PLAYER:
            return state.current = action.payload;
            

        // case SET_WINNER:
        //     let winner = state.winner,

        // break;

        default:
            return state;
    }

    
});

export default reducer;