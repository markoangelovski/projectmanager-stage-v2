import React from "react";

import EventSubmit from "../../components/EventSubmit/EventSubmit";
import ClockList from "../../components/ClockList/ClockList";
import TaskPicker from "../../components/TaskPicker/TaskPicker";

const Clock = () => {
  return (
    <>
      <EventSubmit />
      <TaskPicker />
      <ClockList />
    </>
  );
};

export default Clock;
