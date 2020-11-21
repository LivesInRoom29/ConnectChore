import { AccordionActions } from "@material-ui/core";
import { STATES } from "mongoose";
import DROP_TILE from "../actions/types";



function gameReducer(){
    if (action.type === 'DROP_TILE') {
        console.log('dropping onto col' + action.payload);
    }

    return state;
};

export default gameReducer;