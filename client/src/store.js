import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { initial } from "./reducers/gamereducer";

const initialState = {
    game: initial
};
const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;


// NOTES
// createStore() creates a Redux store that holds the complete state tree of your app. There should only be a single store in your app.
// Our store also sends application state to our React components, which will react accordingly to that state.