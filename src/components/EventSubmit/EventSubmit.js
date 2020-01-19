import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import moment from "moment";

const EventSubmit = () => {
  const { eventTitle, eventDuration, selectedTask } = useStoreState(
    state => state
  );

  const {
    setEventTitle,
    setEventDuration,
    submitDay,
    setInitialDayValues
  } = useStoreActions(actions => actions);

  const submitDayCall = e => {
    e.preventDefault();
    const createEventPayload = {
      day: moment().format("YYYY-MM-DD"),
      task: selectedTask ? selectedTask : "",
      title: eventTitle,
      duration: eventDuration
    };

    submitDay(createEventPayload);
    setInitialDayValues();
  };

  return (
    <form onSubmit={e => submitDayCall(e)}>
      <input
        onChange={e => setEventTitle(e.target.value)}
        type="text"
        placeholder="Event title"
        value={eventTitle}
      ></input>
      <input
        onChange={e => setEventDuration(e.target.value)}
        type="number"
        placeholder="Event duration"
        value={eventDuration}
        step="0.25"
        min="0.25"
        max="7.5"
      ></input>
      <input type="submit"></input>
    </form>
  );
};

export default EventSubmit;
