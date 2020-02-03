import { action, thunk, createStore, computed } from "easy-peasy";
import moment from "moment";

import { getProjects, setProjects } from "../utils/projects.actions";
import { getTasks, setTasks, setSelectedTask } from "../utils/tasks.actions";
import {
  setDayStart,
  setDayEnd,
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
  setInitialDayValues
} from "../utils/events.actions";

const Store = createStore({
  projects: [],
  tasks: [],
  selectedTask: "",
  dayStart: moment()
    .subtract(1, "week")
    .format("YYYY-MM-DD"),
  dayEnd: moment().format("YYYY-MM-DD"),
  eventTitle: "",
  eventDuration: 0.25,
  dayRangeError: false,
  days: [],
  singleDay: {},
  fetching: false,
  overlay: false,
  // Project Thunks
  getProjects: thunk(actions => getProjects(actions)),
  // Task Thunks
  getTasks: thunk(actions => getTasks(actions)),
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
  // Days Computed
  getComputedDay: computed(state => getComputedDay(state)),
  // Project Actions
  setProjects: action((state, projects) => setProjects(state, projects)),
  // Task Actions
  setTasks: action((state, tasks) => setTasks(state, tasks)),
  setSelectedTask: action((state, selectedTask) =>
    setSelectedTask(state, selectedTask)
  ),
  // Days Actions
  setDayStart: action((state, dayStart) => setDayStart(state, dayStart)),
  setDayEnd: action((state, dayEnd) => setDayEnd(state, dayEnd)),
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
  toggleFetching: action(state => {
    state.fetching = !state.fetching;
  }),
  toggleOverlay: action(state => {
    state.overlay = !state.overlay;
  })
});

export default Store;
