import moment from "moment";

import {
  getDaysCall,
  getSingleDayCall,
  createEventCall
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
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const setSingleDay = (state, singleDay) => {
  state.singleDay = singleDay;
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

const setInitialDayValues = state => {
  state.eventTitle = "";
  state.eventDuration = 0.25;
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
  submitDay,
  setUpdatedDay,
  setInitialDayValues
};
