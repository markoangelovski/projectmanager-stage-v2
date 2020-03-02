import { getTasksCall } from "../drivers/Task/task.driver";
import { getNotesCall } from "../drivers/Task/note.driver";

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

const setSelectedTask = (state, selectedTask) => {
  state.selectedTask = selectedTask;
};

const getNotes = async actions => {
  actions.toggleFetching();
  try {
    const { notes } = await getNotesCall();
    actions.setNotes(notes);
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const setNotes = (state, notes) => {
  state.notes = notes;
};

export { getTasks, setTasks, setSelectedTask, getNotes, setNotes };
