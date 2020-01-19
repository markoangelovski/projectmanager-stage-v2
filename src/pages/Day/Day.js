import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import Event from "../../components/Event/Event";

const Day = props => {
  // Component mount check due to async data fetching.
  const [didMount, setDidMount] = useState(false);

  const { singleDay, fetching, days } = useStoreState(state => state);
  const { getSingleDay } = useStoreActions(actions => actions);
  console.log("<Day>", singleDay);

  const dayId = props.match.params.dayId;

  useEffect(() => {
    if (/^[a-f\d]{24}$/i.test(dayId)) getSingleDay({ id: dayId });

    // App breaks without checking if the component mounted and returning null if not
    setDidMount(true);
    return () => setDidMount(false);
    // eslint-disable-next-line
  }, [days]);

  if (!didMount) return null;

  if (!/^[a-f\d]{24}$/i.test(dayId)) return <div>Day not found.</div>;
  if (fetching) return <div>Fetching details...</div>;

  return (
    <>
      <div>HEll from DAy: {singleDay.day}</div>
      {singleDay.events.map(event => (
        <Event key={event._id} event={event} />
      ))}
      <div>
        Total:{" "}
        {singleDay.events.reduce((total, event) => total + event.duration, 0)}
      </div>
    </>
  );
};

export default Day;
