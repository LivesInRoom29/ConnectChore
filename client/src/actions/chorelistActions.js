export const addTaskAction = (taskId) => (
  {
    type: "ADD_TASK",
    payload: taskId
  }
);

export const setTasksAction = (tasksArray) => (
  {
    type: "SET_TASKS",
    payload: tasksArray
  }
);

export const changeCompletionAction = (newCompletionStatus) => (
  {
    type: "CHANGE_TASK_COMPLETION",
    payload: newCompletionStatus
  }
)

export const deleteTask = () => (
  {type: "DELETE_TASK"}
)