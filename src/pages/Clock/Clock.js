import React from "react";

import ClockList from "../../components/ClockList/ClockList";
import DayStats from "../../components/DayStats/DayStats";

const Clock = () => {
  return (
    <>
      <DayStats />
      <ClockList />
    </>
  );
};

export default Clock;
