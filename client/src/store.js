import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { initialGameState } from "./reducers/gameReducer";
import { initialChorelistState } from "./reducers/chorelistReducer";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const initialState = {
    chorelist: initialChorelistState,
    game: initialGameState
};


const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
);

export default store;


// NOTES
// createStore() creates a Redux store that holds the complete state tree of your app. There should only be a single store in your app.
// Our store also sends application state to our React components, which will react accordingly to that state.
// To allow the app to work in incognito mode, transitioned from using 'compose' to 'composeWithDevTools'. Refer to:
// https://www.npmjs.com/package/redux-devtools-extension
// https://github.com/reduxjs/redux/issues/2359