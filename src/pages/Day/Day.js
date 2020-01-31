import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import DayTitle from "../../components/DayTitle/DayTitle";
import DayStats from "../../components/DayStats/DayStats";
import Event from "../../components/Event/Event";

const Day = props => {
  const { singleDay, fetching, days } = useStoreState(state => state);
  const { getSingleDay } = useStoreActions(actions => actions);
  console.log("<Day>", singleDay);

  const dayId = props.match.params.dayId;

  useEffect(() => {
    if (/^[a-f\d]{24}$/i.test(dayId)) getSingleDay({ id: dayId });
    // eslint-disable-next-line
  }, [days]);

  if (!/^[a-f\d]{24}$/i.test(dayId)) return <div>Day not found.</div>;
  if (fetching) return <div>Fetching details...</div>;
  if (!singleDay.events) return null;

  return (
    <>
      <DayTitle day={singleDay.day} />
      <DayStats />
      {singleDay.events.map(event => (
        <Event key={event._id} event={event} />
      ))}
    </>
  );
};

export default Day;
