import {
  getTasksCall,
  getTasksByProjectCall
} from "../drivers/Task/task.driver";
import {
  getNotesCall,
  getSingleTaskNotesCall
} from "../drivers/Task/note.driver";

const getTasks = async (actions, skip) => {
  actions.toggleFetching();
  try {
    const res = await getTasksCall(skip);
    if (!res.error) {
      actions.setTasks(res.tasks);
      actions.setHasMoreTasks(res.stats);
      actions.setTasksSkip();
    }
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const setTasks = (state, tasks) => {
  const arr1 = state.tasks.map(task => [task._id, task]);
  const arr2 = tasks.map(task => [task._id, task]);
  const obj = Object.fromEntries([...arr1, ...arr2]);
  state.tasks = Object.values(obj);
};

const setHasMoreTasks = (state, stats) => {
  if (!stats.remaining) state.hasMoreTasks = false;
};

const setTasksSkip = state => {
  state.tasksSkip += 10;
};

const setSelectedTask = (state, selectedTask) => {
  state.selectedTask = selectedTask;
};

const getTasksByProject = async (actions, projectId) => {
  actions.toggleFetching();
  try {
    const res = await getTasksByProjectCall(projectId);
    if (!res.error) actions.setTasks(res.tasks);
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const getSingleTaskNotes = async (actions, taskId) => {
  actions.toggleFetching();
  try {
    const res = await getSingleTaskNotesCall(taskId);
    if (!res.error) actions.setSingleTaskNotes(res.notes);
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const setSingleTaskNotes = (state, notes) => {
  state.singleTaskNotes = notes;
};

const getNotes = async actions => {
  actions.toggleFetching();
  try {
    const res = await getNotesCall();
    if (!res.error) actions.setAllNotes(res.notes);
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const setAllNotes = (state, notes) => {
  const arr1 = state.notes.map(note => [note._id, note]);
  const arr2 = notes.map(note => [note._id, note]);
  const obj = Object.fromEntries([...arr1, ...arr2]);
  state.notes = Object.values(obj);
};

export {
  getTasks,
  getTasksByProject,
  setTasks,
  setHasMoreTasks,
  setTasksSkip,
  setSelectedTask,
  getSingleTaskNotes,
  setSingleTaskNotes,
  getNotes,
  setAllNotes
};
