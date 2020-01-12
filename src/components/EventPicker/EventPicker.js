import React from "react";

const EventPicker = props => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        props.getEventsCall();
      }}
    >
      <label htmlFor="start">Start date:</label>
      <input
        type="date"
        id="start"
        name="events-start"
        value={props.start}
        onChange={e => props.setStart(e.target.value)}
      ></input>
      <label htmlFor="end">End date:</label>
      <input
        type="date"
        id="end"
        name="events-end"
        value={props.end}
        onChange={e => props.setEnd(e.target.value)}
      ></input>
      <input type="submit"></input>
      {props.selectError && (
        <div style={{ color: "red" }}>
          Start date must not be later than end date.
        </div>
      )}
    </form>
  );
};

export default EventPicker;
