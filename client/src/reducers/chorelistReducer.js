import produce from "immer";

export const initialChorelistState = {
  tasks: [],
};

// From immer docs: https://immerjs.github.io/immer/docs/introduction
// immer creates a temporary draftState based off of the current state
// once the mutations are complete, immer, it returns the nextState based on the changes to the draftState
// So the state itself is never mutated.
const chorelistReducer = produce((draft = initialChorelistState, action) => {
  //switch statement
  switch(action.type) {
    case "ADD_TASK":
      draft.tasks.push(action.payload);
      return;
    case "SET_TASKS":
      draft.tasks = action.payload;
      return;
    case "CHANGE_TASK_COMPLETION":
      draft.tasks.completionStatus = action.payload;
      return;
    case "DELETE_TASK":
      draft.tasks.task.isDeleted = true;
      return;
    default:
      return draft;
  }
});

export default chorelistReducer;