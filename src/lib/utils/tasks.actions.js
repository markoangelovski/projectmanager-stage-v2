import { getTasksCall } from "../drivers/Task/task.driver";

const getTasks = async actions => {
  actions.toggleFetching();
  try {
    const { tasks } = await getTasksCall();
    actions.setTasks(tasks);
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const setTasks = (state, tasks) => {
  state.tasks = tasks;
};

export { getTasks, setTasks };
