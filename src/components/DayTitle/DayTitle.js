import React from "react";
import moment from "moment";

import { DayTitleH1 } from "./DayTitle.styles";

const DayTitle = props => {
  const title = moment(props.day).format("dddd MMMM Do, YYYY. ");

  return <DayTitleH1>{title}</DayTitleH1>;
};

export default DayTitle;
