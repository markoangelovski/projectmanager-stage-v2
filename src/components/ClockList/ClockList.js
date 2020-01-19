import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import Event from "../../components/Event/Event";

const ClockList = () => {
  const { singleDay, dayEnd, fetching } = useStoreState(state => state);
  const { getSingleDay } = useStoreActions(actions => actions);

  // Load current day
  useEffect(() => {
    getSingleDay(dayEnd);
    // eslint-disable-next-line
  }, []);

  if (fetching) return <div>Loading data...</div>;
  if (!singleDay.events) return null;

  return (
    <>
      <div>
        Total:{" "}
        {singleDay.events.reduce((total, event) => total + event.duration, 0)}
      </div>
      {singleDay.events.map(event => (
        <Event key={event._id} event={event} />
      ))}
    </>
  );
};

export default ClockList;
