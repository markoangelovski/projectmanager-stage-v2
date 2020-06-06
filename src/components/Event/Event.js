import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link } from "react-router-dom";
import {
  FaTasks,
  FaRegTrashAlt,
  FaCheck,
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
// import EventBook from "../EventBook/EventBook";

const Event = props => {
  const [edit, setEdit] = useState(false);
  // const [booking, setBooking] = useState(false);
  const { tasks } = useStoreState(state => state);
  const { deleteDay } = useStoreActions(actions => actions);

  const { task } = props.event;

  const selectedTask = tasks.find(arrTask => {
    return arrTask._id === task;
  });

  const hasKan = selectedTask && selectedTask.kanboard;

  const taskURL =
    selectedTask &&
    `/projects/${selectedTask.project}/tasks/${selectedTask._id}`;

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
        {props.event.booked ? <FaCheck /> : <FaBan />}
        <FaTasks />
        <EventSpan small>
          {selectedTask && <Link to={taskURL}> {selectedTask.title} </Link>}
        </EventSpan>
      </EventTask>
      <EventBooking>
        {hasKan && !props.event.booked && (
          <a
            href={
              hasKan &&
              `${selectedTask.kanboard}#d=${moment(props.event.date).format(
                "DD-MM"
              )}&t=${props.event.duration}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaBook />
          </a>
        )}
        {/* {!props.event.booked && <FaBook onClick={() => setBooking(true)} />} */}
        {/* {booking && <EventBook event={props.event} setBooking={setBooking} />} */}
      </EventBooking>
    </EventBody>
  );
};

export default Event;
