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