import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { FaTasks } from "react-icons/fa";
import moment from "moment";

import {
  EventBody,
  EventTitle,
  EventTask,
  EventDuration,
  EventBooking
} from "./Event.styles";

const Event = props => {
  const { tasks } = useStoreState(state => state);
  const { getTasks } = useStoreActions(actions => actions);

  const { task } = props.event;

  const selectedTask = tasks.find(arrTask => {
    return arrTask._id === task;
  });

  useEffect(() => {
    if (task && task.length > 0 && tasks.length === 0) getTasks();
    // eslint-disable-next-line
  }, []);

  return (
    <EventBody>
      <EventTitle>
        {props.event.title}{" "}
        <span>{moment(props.event.date).format("MMM Do")}</span>
      </EventTitle>
      <EventTask>
        <FaTasks />
        <span>{selectedTask && selectedTask.title}</span>
      </EventTask>
      <EventDuration>{props.event.duration}</EventDuration>
      <EventBooking>{props.event.booked ? "Yes" : "No"}</EventBooking>
    </EventBody>
  );
};

export default Event;
