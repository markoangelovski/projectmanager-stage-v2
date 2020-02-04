import moment from "moment";

import {
  getDaysCall,
  getSingleDayCall,
  createEventCall,
  updateEventCall,
  deleteEventCall
} from "../drivers/Event/event.driver";

const setDayStart = (state, dayStart) => {
  state.dayStart = dayStart;
};

const setDayEnd = (state, dayEnd) => {
  state.dayEnd = dayEnd;
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
    if (
      res.message === "Day not found." ||
      res.message === "No day entries found."
    )
      actions.setSingleDay({});
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const setSingleDay = (state, singleDay) => {
  state.singleDay = singleDay;
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

  return [totalEvents, totalBooked, timeMarked, timeRemaining];
};

const submitDay = async (actions, payload) => {
  actions.toggleFetching();
  try {
    const res = await createEventCall(payload);
    if (!res.error) actions.setUpdatedDay(res.day);
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
    console.log("res", res);
    if (!res.error) {
      actions.toggleFetching();
      actions.getSingleDay({ start: moment().format("YYYY-MM-DD") });
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
  state.dayStart = moment()
    .subtract(1, "week")
    .format("YYYY-MM-DD");
  state.dayEnd = moment().format("YYYY-MM-DD");
};

export {
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
};
