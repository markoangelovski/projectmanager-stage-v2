import React from "react";

import EventSubmit from "../../components/EventSubmit/EventSubmit";
import TaskPicker from "../../components/TaskPicker/TaskPicker";
import DayList from "../../components/DayList/DayList";
import DayRangePicker from "../../components/DayRangePicker/DayRangePicker";

const Days = () => {
  console.log("<Days>");

  return (
    <>
      <EventSubmit />
      <TaskPicker />
      <DayList />
      <DayRangePicker />
    </>
  );
};

export default Days;
