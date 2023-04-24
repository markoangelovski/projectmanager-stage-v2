import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { FaArrowRight } from "react-icons/fa";

import {
  EventSubmitLogBody,
  EventLogTitle,
  EventLogInput,
  EventLogDuration,
} from "./EventSubmitLog.styles";

import { createLogCall } from "../../lib/drivers/Event/event.driver";

const EventSubmitLog = ({ event, addLog, setAddLog }) => {
  const [addLogTitle, setAddLogTitle] = useState("");
  const [addLogDuration, setAddLogDuration] = useState(0);

  const { reFetchEvents } = useStoreActions((actions) => actions);

  const canSend = addLogTitle.length > 2 && addLogDuration > 0;

  const createLog = async () => {
    setAddLog(false);
    try {
      const newLog =
        canSend &&
        (await createLogCall({
          event: event._id,
          title: addLogTitle,
          duration: addLogDuration,
        }));
      if (newLog.error)
        throw new Error("An error ocurred while creating a new log.");
      if (newLog.message) {
        reFetchEvents();
      }
    } catch (error) {
      console.warn(error);
      setAddLog(false);
      setAddLogTitle("");
      setAddLogDuration(0);
    }
  };

  return (
    <EventSubmitLogBody>
      <EventLogTitle>
        <EventLogInput
          type="text"
          onInput={(e) => setAddLogTitle(e.target.value)}
        />
      </EventLogTitle>
      <EventLogDuration>
        <EventLogInput
          duration
          type="number"
          placeholder="0"
          min="0.25"
          max="7.5"
          step="0.25"
          onInput={(e) => setAddLogDuration(e.target.value)}
        />{" "}
        <span>h</span>
        {canSend && <FaArrowRight onClick={() => createLog()} />}
      </EventLogDuration>
    </EventSubmitLogBody>
  );
};

export default EventSubmitLog;
