import { action, thunk, createStore } from "easy-peasy";

import { getProjects, setProjects } from "../utils/projects.actions";
import { getTasks, setTasks } from "../utils/tasks.actions";
import {
  getEvents,
  setEvents,
  submitEvent,
  setEvent
} from "../utils/events.actions";

const Store = createStore({
  projects: [],
  tasks: [],
  events: [],
  fetching: false,
  // Thunks
  getProjects: thunk(actions => getProjects(actions)),
  getTasks: thunk(actions => getTasks(actions)),
  getEvents: thunk((actions, payload) => getEvents(actions, payload)),
  submitEvent: thunk((actions, payload) => submitEvent(actions, payload)),
  // Actions
  setProjects: action((state, projects) => setProjects(state, projects)),
  setTasks: action((state, tasks) => setTasks(state, tasks)),
  setEvents: action((state, events) => setEvents(state, events)),
  setEvent: action((state, event) => setEvent(state, event)),
  toggleFetching: action(state => {
    state.fetching = !state.fetching;
  })
});

export default Store;
