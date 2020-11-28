import { combineReducers } from "redux";
import gameReducer from "./gameReducer";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import chorelistReducer from "./chorelistReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  chorelist: chorelistReducer
});



// NOTES
// Reducers are pure functions that specify how application state should change in response to an action. Reducers respond with the new state, which is passed to our store and, in turn, our UI.
// Our flow for reducers will go as follows.
// Import all our actions from our types.js file
// Define our initialState
// Define how state should change based on actions with a switch statement
// Had to update import statements by adding "s"