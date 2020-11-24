import produce from "immer";

export const initialChorelistState = {
  tasks: []
};

const chorelistReducer = produce((draft = initialChorelistState, action) => {
  //switch statement
  switch(action.type) {
    case "ADD_TASK":
      draft.tasks.push(action.payload);
      return;
    case "SET_TASKS":
      draft.tasks = action.payload;
      return;
    default:
      return draft;
  }
});

export default chorelistReducer;