import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";

import { FaRegTrashAlt, FaPencilAlt, FaArrowRight } from "react-icons/fa";

import {
  EventLogPlaceholder,
  EventLogDuration,
  EventLogTitle,
  EventLogInput,
  EventLogTitlePlaceholder,
} from "./EventLog.styles";

import {
  updateLogCall,
  deleteLogCall,
} from "../../lib/drivers/Event/event.driver";

const EventLog = ({ log }) => {
  const [editLog, setEditLog] = useState(false);
  const [editLogTitle, setEditLogTitle] = useState(log.title);
  const [editLogDuration, setEditLogDuration] = useState(log.duration);

  const { reFetchEvents } = useStoreActions(actions => actions);

  const updateLog = async () => {
    const payload = [
      { propName: "title", propValue: editLogTitle },
      { propName: "duration", propValue: editLogDuration },
    ];

    const canSend = payload[0].propValue.length > 0 && payload[1].propValue > 0;

    try {
      const updatedLog = canSend && (await updateLogCall(log._id, payload));
      if (updatedLog.error) throw new Error("Log update failed.");
      if (updatedLog.message) {
        // Reset input fields
        setEditLog(!editLog);
        reFetchEvents();
      }
    } catch (error) {
      console.warn(error);
      // Reset input fields
      setEditLog(!editLog);
      // Reset field values to defaults
      setEditLogTitle(log.title);
      setEditLogDuration(log.duration);
    }
  };

  const deleteLog = async () => {
    try {
      const deletedLog = await deleteLogCall(log._id);
      if (deletedLog.error)
        throw new Error("An error occurred while deleting the log!");
      if (deletedLog.message) reFetchEvents();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <EventLogPlaceholder>
      <FaRegTrashAlt
        onClick={() => {
          window.confirm("Are you sure you want to delete this log?") &&
            deleteLog();
        }}
      />
      <FaPencilAlt
        onClick={() => {
          // Set input fields to editable
          setEditLog(!editLog);
          // Reset field values to defaults
          setEditLogTitle(log.title);
          setEditLogDuration(log.duration);
        }}
      />
      <EventLogTitle>
        {editLog && (
          <EventLogInput
            type="text"
            disabled={!editLog}
            defaultValue={editLogTitle}
            onInput={e => setEditLogTitle(e.target.value)}
          />
        )}
        {!editLog && (
          <EventLogTitlePlaceholder>{editLogTitle}</EventLogTitlePlaceholder>
        )}
      </EventLogTitle>
      <EventLogDuration>
        <EventLogInput
          type="number"
          placeholder="0"
          min="0.25"
          max="7.5"
          step="0.25"
          duration
          disabled={!editLog}
          value={editLogDuration}
          onInput={e => setEditLogDuration(e.target.value)}
        />{" "}
        <span>h</span>
        {editLog && <FaArrowRight onClick={() => updateLog()} />}
      </EventLogDuration>
    </EventLogPlaceholder>
  );
};

export default EventLog;
