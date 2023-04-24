import React from "react";

import DayList from "../../components/DayList/DayList";
import DayRangePicker from "../../components/DayRangePicker/DayRangePicker";

const Days = () => {
  console.log("<Days>");

  return (
    <>
      <DayRangePicker />
      <DayList />
    </>
  );
};

export default Days;
