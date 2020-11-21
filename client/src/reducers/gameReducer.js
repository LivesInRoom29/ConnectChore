
const initial = {
    current: "red", // can also be black
    board: [
        [], //col 1
        [], //col 2
        [], //col 3
        [], //col 4
        [], //col 5
        [], //col 6
        [] //col 7
    ]
}
export default function reducer(state,action) {
    if (action.type === "DROP_TILE") {
        console.log("dropping onto col" + action.payload);
        const tile = state.current;
        const col = state.board[action.payload].concat(tile); // new column

        const board = state.board.slice(); // need to copy, can't change directly
        board[action.payload] = col;  // need to update column with new tile

        return {
            current: state.current === 'red' ? 'black' : 'red',
            board: board,
        }
    }
    return state;
};
