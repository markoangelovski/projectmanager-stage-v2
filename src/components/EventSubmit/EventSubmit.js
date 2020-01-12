import React from "react";

const EventSubmit = ({ actions }) => {
  return (
    <form onSubmit={() => actions.submitEventsCall()}>
      <input
        onChange={e => actions.setEventTitle(e.target.value)}
        type="text"
        placeholder="Event title"
        value={actions.eventTitle}
      ></input>
      <input
        onChange={e => actions.setEventDuration(e.target.value)}
        type="number"
        placeholder="Event duration"
        value={actions.eventDuration}
        step="0.25"
        min="0.25"
        max="7.5"
      ></input>
      <input type="submit"></input>
    </form>
  );
};

export default EventSubmit;
