import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link } from "react-router-dom";
import {
  FaTasks,
  FaRegTrashAlt,
  FaCheck,
  FaBan,
  FaBook,
  FaPencilAlt,
  FaPlus,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import moment from "moment";

import {
  EventBody,
  EventDateSpan,
  EventTitleDurationSection,
  EventTaskTitle,
  EventDuration,
  EventSpan,
  EventUtils,
  EventLogCount,
} from "./Event.styles";

import EditEvent from "../EditEvent/EditEvent";
import EventLog from "../EventLog/EventLog";
import EventSubmitLog from "../EventSubmitLog/EventSubmitLog";

const Event = props => {
  const [edit, setEdit] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [addLog, setAddLog] = useState(false);

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

  const bookingURL =
    hasKan &&
    `${selectedTask.kanboard}#d=${moment(props.event.date).format("DD-MM")}&t=${
      props.event.duration
    }`;

  const logCount = props.event.logs.length;

  return (
    <EventBody>
      <EventTaskTitle>
        {props.event.booked ? <FaCheck /> : <FaBan />}
        <FaTasks />
        <EventSpan small>
          {selectedTask && <Link to={taskURL}> {selectedTask.title} </Link>}
        </EventSpan>
        <EventDateSpan>
          {moment(props.event.date).format("MMM Do")}
        </EventDateSpan>
      </EventTaskTitle>
      <EventTitleDurationSection>
        <EventSpan>{props.event.title}</EventSpan>{" "}
        <EventDuration>
          {props.event.duration} <span>h</span>
        </EventDuration>
        {showLogs &&
          props.event.logs.map(log => <EventLog log={log} key={log._id} />)}
        {addLog && (
          <EventSubmitLog
            event={props.event}
            addLog={addLog}
            setAddLog={setAddLog}
          />
        )}
      </EventTitleDurationSection>
      <EventUtils>
        <FaRegTrashAlt
          onClick={() => {
            window.confirm("Are you sure you want to delete this event?") &&
              deleteDay({ dayId: props.event.day, eventId: props.event._id });
          }}
        />
        <FaPencilAlt onClick={() => setEdit(true)} />
        {edit && <EditEvent event={props.event} setEdit={setEdit} />}
        {hasKan && !props.event.booked && (
          <a href={bookingURL} target="_blank" rel="noopener noreferrer">
            <FaBook />
          </a>
        )}
        <FaPlus onClick={() => setAddLog(!addLog)} />
        {!showLogs && (
          <>
            <FaArrowDown onClick={() => setShowLogs(!showLogs)} />{" "}
            <EventLogCount>{logCount}</EventLogCount>
          </>
        )}
        {showLogs && (
          <>
            <FaArrowUp onClick={() => setShowLogs(!showLogs)} />{" "}
            <EventLogCount>{logCount}</EventLogCount>
          </>
        )}
      </EventUtils>
    </EventBody>
  );
};

export default Event;
