import { action, thunk, createStore } from "easy-peasy";

import { getProjectsCall } from "../drivers/Project/project.driver";
import { getTasksCall } from "../drivers/Task/task.driver";
import { getEventsCall, createEventCall } from "../drivers/Event/event.driver";

const Store = createStore({
  projects: [],
  tasks: [],
  events: [],
  fetching: false,
  // Thunks
  getProjects: thunk(async actions => {
    actions.toggleFetching();
    try {
      const { projects } = await getProjectsCall();
      actions.setProjects(projects);
      actions.toggleFetching();
    } catch (error) {
      actions.toggleFetching();
      console.warn(error);
    }
  }),
  getTasks: thunk(async actions => {
    actions.toggleFetching();
    try {
      const { tasks } = await getTasksCall();
      actions.setTasks(tasks);
      actions.toggleFetching();
    } catch (error) {
      actions.toggleFetching();
      console.warn(error);
    }
  }),
  getEvents: thunk(async (actions, payload) => {
    actions.toggleFetching();
    try {
      const events = await getEventsCall(payload);
      if (!events.error) actions.setEvents(events.days);
      actions.toggleFetching();
    } catch (error) {
      actions.toggleFetching();
      console.warn(error);
    }
  }),
  submitEvents: thunk(async (actions, payload) => {
    actions.toggleFetching();
    try {
      const day = await createEventCall(payload);
      console.log("day", day);
      if (!day.error) actions.setEvent(day.event);
      actions.toggleFetching();
    } catch (error) {
      actions.toggleFetching();
      console.warn(error);
    }
  }),
  // Actions
  setProjects: action((state, projects) => {
    state.projects = projects;
  }),
  setTasks: action((state, tasks) => {
    state.tasks = tasks;
  }),
  setEvents: action((state, events) => {
    state.events = events;
  }),
  setEvent: action((state, event) => {
    const updatedEvent = state.events.find(
      oldEvent => oldEvent._id === event._id
    );
    if (!updatedEvent) {
      state.events = state.events.push(event);
    } else {
      updatedEvent.events = event.events;
    }
  }),
  toggleFetching: action(state => {
    state.fetching = !state.fetching;
  })
});

export default Store;
