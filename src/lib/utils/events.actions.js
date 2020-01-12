import { getEventsCall, createEventCall } from "../drivers/Event/event.driver";

const getEvents = async (actions, payload) => {
  actions.toggleFetching();
  try {
    const events = await getEventsCall(payload);
    if (!events.error) actions.setEvents(events.days);
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const setEvents = (state, events) => {
  state.events = events;
};

const submitEvent = async (actions, payload) => {
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
};

const setEvent = (state, event) => {
  const updatedEvent = state.events.find(
    oldEvent => oldEvent._id === event._id
  );
  if (!updatedEvent) {
    state.events = state.events.push(event);
  } else {
    updatedEvent.events = event.events;
  }
};

export { getEvents, setEvents, submitEvent, setEvent };
