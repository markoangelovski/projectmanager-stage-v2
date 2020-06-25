import moment from "moment";

import {
  getDaysCall,
  getSingleDayCall,
  createEventCall,
  updateEventCall,
  deleteEventCall,
  getSingleTaskEventsCall,
} from "../drivers/Event/event.driver";

const setDayStart = (state, dayStart) => {
  state.dayStart = dayStart;
};

const setDayEnd = (state, dayEnd) => {
  state.dayEnd = dayEnd;
};

const setDayStartHour = (state, dayStartHour) => {
  state.dayStartHour = dayStartHour;
};

const setEventTitle = (state, eventTitle) => {
  state.eventTitle = eventTitle;
};

const setEventDuration = (state, eventDuration) => {
  state.eventDuration = eventDuration;
};

const setDayRangeError = (state, dayRangeError) => {
  state.dayRangeError = dayRangeError;
};

const getDays = async (actions, payload) => {
  actions.toggleFetching();
  try {
    const res = await getDaysCall(payload);
    if (!res.error) actions.setDays(res.days);
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const setDays = (state, days) => {
  state.days = days;
};

const getSingleDay = async (actions, { start, id }) => {
  actions.toggleFetching();
  try {
    const res = await getSingleDayCall({ start, id });
    if (!res.error) actions.setSingleDay(res.days);
    if (res.message === "ERR_NO_DAY_ENTRIES_FOUND") actions.setSingleDay({});
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const setSingleDay = (state, singleDay) => {
  state.singleDay = singleDay || {};
  state.dayStartHour = (singleDay && singleDay.start) || 0;
};

const getComputedDay = state => {
  const totalEvents =
    (state.singleDay._id && state.singleDay.events.length) || 0;

  const totalBooked =
    (state.singleDay._id &&
      state.singleDay.events.filter(event => event.booked).length) ||
    0;

  const timeMarked =
    (state.singleDay._id &&
      state.singleDay.events.reduce((acc, event) => acc + event.duration, 0)) ||
    0;

  const timeRemaining = 7.5 - timeMarked;

  const timeInDayMs = (state.dayStartHour + timeMarked) * 60 * 60 * 1000;
  const tempTime = moment.duration(timeInDayMs);
  var timeInDay = tempTime.hours() + ":" + tempTime.minutes();

  return [totalEvents, totalBooked, timeMarked, timeRemaining, timeInDay];
};

const submitDay = async (actions, payload) => {
  actions.toggleFetching();
  try {
    const res = await createEventCall(payload);
    if (!res.error) actions.setUpdatedDay(res.day);
    actions.reFetchEvents();
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const setUpdatedDay = (state, day) => {
  const days = [...state.days];
  const index = days.findIndex(oldDay => oldDay._id === day._id);
  if (index > -1) {
    days.splice(index, 1);
    days.push(day);
    days.sort((a, b) => b.date - a.date);
    state.days = days;
  } else {
    days.push(day);
    days.sort((a, b) => b.date - a.date);
    state.days = days;
  }
};

const updateEvent = async (actions, { eventId, payload }) => {
  actions.toggleFetching();
  try {
    const res = await updateEventCall(eventId, payload);
    if (!res.error) {
      actions.toggleFetching();
      actions.reFetchEvents();
    } else {
      actions.toggleFetching();
    }
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const deleteDay = async (actions, { dayId, eventId }) => {
  actions.toggleFetching();
  try {
    const res = await deleteEventCall(dayId, eventId);
    if (!res.error) actions.setDeletedDay(res.day);
    actions.reFetchEvents();
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const setDeletedDay = (state, day) => {
  const days = [...state.days];
  const index = days.findIndex(oldDay => oldDay._id === day._id);
  days.splice(index, 1);
  days.sort((a, b) => b.date - a.date);
  state.days = days;
};

const setInitialDayValues = state => {
  state.eventTitle = "";
  state.eventDuration = 0.25;
  state.selectedTask = "";
  state.dayStart = moment().subtract(4, "week").format("YYYY-MM-DD");
  state.dayEnd = moment().format("YYYY-MM-DD");
};

const getSingleTaskEvents = async (actions, payload) => {
  actions.toggleFetching();
  try {
    const res = await getSingleTaskEventsCall(payload);
    if (!res.error) actions.setSingleTaskEvents(res.events);
    if (res.message === "No event entries found.")
      actions.setSingleTaskEvents([]);
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const setSingleTaskEvents = (state, events) => {
  state.singleTaskEvents = events;
};

const reFetchEvents = async actions => {
  const slug = window.location.hash;

  // If Clock route is being displayed, re-fetch events by current date
  /clock/.test(slug) &&
    actions.getSingleDay({ start: moment().format("YYYY-MM-DD") });

  // If Days route is being displayed, re-fetch events by day's ID
  if (/days/.test(slug)) {
    const slugData = window.location.hash.match(/days/);
    const dayId = slugData.input.split("/")[2];
    actions.getSingleDay({ id: dayId });
  }

  // If Projects/Tasks route is being displayed, re-fetch events by tasks's ID
  if (/tasks/.test(slug)) {
    const slugData = window.location.hash.match(/tasks/);
    const taskId = slugData.input.split("/")[4];
    actions.getSingleTaskEvents(taskId);
  }
};

export {
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
  reFetchEvents,
};
