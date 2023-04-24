import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const DayRangePicker = () => {
  const { dayStart, dayEnd, dayRangeError } = useStoreState(state => state);

  const {
    setDayStart,
    setDayEnd,
    setDayRangeError,
    getDays,
    setInitialDayValues
  } = useStoreActions(actions => actions);

  const getDaysPayload = `start=${dayStart}&end=${dayEnd}`;

  const getDaysCall = () => {
    if (new Date(dayStart) > new Date(dayEnd)) {
      setDayRangeError(true);
      setInitialDayValues();
    } else {
      setDayRangeError(false);
      getDays(getDaysPayload);
      setInitialDayValues();
    }
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        getDaysCall();
      }}
    >
      <label htmlFor="start">Start date:</label>
      <input
        type="date"
        id="start"
        name="events-start"
        value={dayStart}
        onChange={e => setDayStart(e.target.value)}
      ></input>
      <label htmlFor="end">End date:</label>
      <input
        type="date"
        id="end"
        name="events-end"
        value={dayEnd}
        onChange={e => setDayEnd(e.target.value)}
      ></input>
      <input type="submit"></input>
      {dayRangeError && (
        <div style={{ color: "red" }}>
          Start date must not be later than end date.
        </div>
      )}
    </form>
  );
};

export default DayRangePicker;
