import { action, thunk, createStore, computed } from "easy-peasy";
import moment from "moment";

import {
  getSingleProject,
  getProjects,
  setProjects,
  setHasMoreProjects,
  setProjectsSkip
} from "../utils/projects.actions";
import {
  getTasks,
  setTasks,
  setHasMoreTasks,
  setTasksSkip,
  setSelectedTask,
  getTasksByProject,
  getSingleTaskNotes,
  setSingleTaskNotes,
  getNotes,
  setAllNotes
} from "../utils/tasks.actions";
import {
  setDayStart,
  setDayEnd,
  setDayStartHour,
  setEventTitle,
  setEventDuration,
  setDayRangeError,
  getDays,
  setDays,
  getSingleDay,
  setSingleDay,
  getComputedDay,
  submitDay,
  setUpdatedDay,
  updateEvent,
  deleteDay,
  setDeletedDay,
  setInitialDayValues,
  getSingleTaskEvents,
  setSingleTaskEvents,
  reFetchEvents
} from "../utils/events.actions";

const Store = createStore({
  projects: [],
  hasMoreProjects: true,
  projectsSkip: 0,
  tasks: [],
  hasMoreTasks: true,
  tasksSkip: 0,
  singleTaskNotes: [],
  notes: [],
  singleTaskEvents: [],
  selectedTask: "",
  dayStart: moment().subtract(4, "week").format("YYYY-MM-DD"),
  dayEnd: moment().format("YYYY-MM-DD"),
  dayStartHour: 0,
  eventTitle: "",
  eventDuration: 0.25,
  dayRangeError: false,
  days: [],
  singleDay: {},
  fetching: false,
  overlay: false,
  // Project Thunks
  getSingleProject: thunk((actions, payload) =>
    getSingleProject(actions, payload)
  ),
  getProjects: thunk((actions, skip) => getProjects(actions, skip)),
  // Task Thunks
  getTasks: thunk((actions, skip) => getTasks(actions, skip)),
  getTasksByProject: thunk((actions, payload) =>
    getTasksByProject(actions, payload)
  ),
  getSingleTaskNotes: thunk((actions, payload) =>
    getSingleTaskNotes(actions, payload)
  ),
  getNotes: thunk(actions => getNotes(actions)),
  // Days Thunks
  getDays: thunk((actions, payload) => getDays(actions, payload)),
  submitDay: thunk((actions, payload) => submitDay(actions, payload)),
  getSingleDay: thunk((actions, { start, id }) =>
    getSingleDay(actions, { start, id })
  ),
  updateEvent: thunk((actions, { eventId, payload }) =>
    updateEvent(actions, { eventId, payload })
  ),
  deleteDay: thunk((actions, payload) => deleteDay(actions, payload)),
  getSingleTaskEvents: thunk((actions, payload) =>
    getSingleTaskEvents(actions, payload)
  ),
  reFetchEvents: thunk(actions => reFetchEvents(actions)),
  // Days Computed
  getComputedDay: computed(state => getComputedDay(state)),
  // Project Actions
  setProjects: action((state, projects) => setProjects(state, projects)),
  setHasMoreProjects: action((state, stats) =>
    setHasMoreProjects(state, stats)
  ),
  setProjectsSkip: action(state => setProjectsSkip(state)),
  // Task Actions
  setTasks: action((state, tasks) => setTasks(state, tasks)),
  setHasMoreTasks: action((state, stats) => setHasMoreTasks(state, stats)),
  setTasksSkip: action(state => setTasksSkip(state)),
  setSelectedTask: action((state, selectedTask) =>
    setSelectedTask(state, selectedTask)
  ),
  setSingleTaskNotes: action((state, notes) =>
    setSingleTaskNotes(state, notes)
  ),
  setAllNotes: action((state, notes) => setAllNotes(state, notes)),
  // Days Actions
  setDayStart: action((state, dayStart) => setDayStart(state, dayStart)),
  setDayEnd: action((state, dayEnd) => setDayEnd(state, dayEnd)),
  setDayStartHour: action((state, dayStartHour) =>
    setDayStartHour(state, dayStartHour)
  ),
  setDayRangeError: action((state, dayRangeError) =>
    setDayRangeError(state, dayRangeError)
  ),
  setEventTitle: action((state, eventTitle) =>
    setEventTitle(state, eventTitle)
  ),
  setEventDuration: action((state, eventDuration) =>
    setEventDuration(state, eventDuration)
  ),
  setDays: action((state, events) => setDays(state, events)),
  setUpdatedDay: action((state, day) => setUpdatedDay(state, day)),
  setSingleDay: action((state, singleDay) => setSingleDay(state, singleDay)),
  setDeletedDay: action((state, day) => setDeletedDay(state, day)),
  setInitialDayValues: action(state => setInitialDayValues(state)),
  setSingleTaskEvents: action((state, events) =>
    setSingleTaskEvents(state, events)
  ),
  // Misc
  toggleFetching: action(state => {
    state.fetching = !state.fetching;
  }),
  toggleOverlay: action(state => {
    state.overlay = !state.overlay;
  })
});

export default Store;
