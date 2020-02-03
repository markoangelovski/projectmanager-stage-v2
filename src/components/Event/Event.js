import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link } from "react-router-dom";
import {
  FaTasks,
  FaRegTrashAlt,
  FaRegCheckCircle,
  FaBan,
  FaBook,
  FaPencilAlt
} from "react-icons/fa";
import moment from "moment";

import {
  EventBody,
  EventTitle,
  EventTask,
  EventDuration,
  EventEdit,
  EventBooking,
  EventSpan
} from "./Event.styles";

import EditEvent from "../EditEvent/EditEvent";

const Event = props => {
  const [edit, setEdit] = useState(false);
  const { tasks } = useStoreState(state => state);
  const { getTasks, deleteDay } = useStoreActions(actions => actions);

  const { task } = props.event;

  const selectedTask = tasks.find(arrTask => {
    return arrTask._id === task;
  });

  const taskURL =
    selectedTask &&
    `/projects/${selectedTask.project}/tasks/${selectedTask._id}`;

  useEffect(() => {
    if (task && task.length > 0 && tasks.length === 0) getTasks();
    // eslint-disable-next-line
  }, []);

  return (
    <EventBody>
      <EventTitle>
        <FaRegTrashAlt
          onClick={() => {
            window.confirm("Are you sure you want to delete this event?") &&
              deleteDay({ dayId: props.event.day, eventId: props.event._id });
          }}
        />
        <EventSpan>{props.event.title}</EventSpan>{" "}
        <EventSpan small>{moment(props.event.date).format("MMM Do")}</EventSpan>
      </EventTitle>
      <EventDuration>
        <span>{props.event.duration} </span>h
      </EventDuration>
      <EventEdit>
        <FaPencilAlt onClick={() => setEdit(true)} />
        {edit && <EditEvent event={props.event} setEdit={setEdit} />}
      </EventEdit>
      <EventTask>
        {props.event.booked ? <FaRegCheckCircle /> : <FaBan />}
        <FaTasks />
        <EventSpan small>
          {selectedTask && <Link to={taskURL}> {selectedTask.title} </Link>}
        </EventSpan>
      </EventTask>
      <EventBooking>
        {!props.event.booked && (
          <FaBook onClick={() => console.log("Clicked Book!")} />
        )}
      </EventBooking>
    </EventBody>
  );
};

export default Event;
