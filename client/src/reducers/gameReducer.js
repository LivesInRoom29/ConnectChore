import produce from 'immer';

const createDefaultBoard = () => {
    const box = [];
    for (let y = 5; y >= 0; y--) {
      const row = [];
      for (let x = 0; x < 7; x++) {
        row.push({color: 'pink'});
    }

      box.push(row);
    }
    return box;
}
export const initial = {
    current: "red", // can also be black
    board: [
        [], //col 1
        [], //col 2
        [], //col 3
        [], //col 4
        [], //col 5
        [], //col 6
        [] //col 7
    ],

    box: createDefaultBoard()
};


const reducer = produce((state = initial, action) => {
    if (action.type === "DROP_TILE") {
        console.log("dropping onto col" + action.payload);
        const {col, row, color} = action.payload;
        
        let dropToRow = state.box.length-1;
        state.box.some((currentRow, index) => {
            if (currentRow[col].color !== 'pink') {
                dropToRow = index-1;
                return true;
            }
            return false;
        }) 
        console.log(dropToRow);
        state.box[dropToRow][col].color = 'red';

        return 
      
    }
    return state;
});

export default reducer;