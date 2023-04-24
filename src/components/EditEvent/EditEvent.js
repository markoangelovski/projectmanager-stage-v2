import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { FaPaperPlane } from "react-icons/fa";

import TaskPicker from "../TaskPicker/TaskPicker";
import SearchTask from "../SearchTask/SearchTask";

import {
  Background,
  EditEventPlaceholder,
  EditEventForm,
  EditEventInput,
  EditEventSubmitButton,
  EditEventWarning,
} from "./EditEvent.styles";

const EditEvent = props => {
  const [inputAllowed, setInputAllowed] = useState(false);
  const [booked, setBooked] = useState(props.event.booked);

  const { eventTitle, selectedTask } = useStoreState(state => state);
  const {
    setEventTitle,
    setEventDuration,
    updateEvent,
    setInitialDayValues,
  } = useStoreActions(actions => actions);

  useEffect(() => {
    setEventTitle(props.event.title);
    setEventDuration(props.event.duration);
    return () => {
      // Reset initial values each time component unmounts
      setInitialDayValues();
    };
    //eslint-disable-next-line
  }, []);

  const editEventCall = () => {
    const payload = [
      {
        propName: "title",
        propValue: eventTitle,
      },
      {
        propName: "booked",
        propValue: booked,
      },
    ];

    if (selectedTask.length > 0)
      payload.push({
        propName: "task",
        propValue: selectedTask,
      });
    console.log("payload", payload);
    if (payload[0].propValue.length > 0) {
      updateEvent({
        eventId: props.event._id,
        payload,
      });
      props.setEdit(false);
      setInitialDayValues();
    } else {
      setInputAllowed(true);
    }
  };

  return (
    <>
      <Background
        className="background"
        onClick={e =>
          e.target.classList.value.includes("background") &&
          props.setEdit(false)
        }
      >
        <EditEventPlaceholder>
          <EditEventForm>
            <div>
              <EditEventInput
                type="text"
                placeholder="Title"
                value={eventTitle}
                onChange={e => setEventTitle(e.target.value)}
              />
              <input
                type="checkbox"
                id="booked"
                defaultChecked={props.event.booked}
                onChange={e => setBooked(!booked)}
              />
              <label htmlFor="booked">Booked</label>
            </div>
            <EditEventSubmitButton eventTitle>
              <FaPaperPlane onClick={e => editEventCall(e)} />
            </EditEventSubmitButton>
          </EditEventForm>
          {!props.event.task && <TaskPicker />}
          {!props.event.task && <SearchTask />}
          {inputAllowed && (
            <EditEventWarning>Title field is mandatory!</EditEventWarning>
          )}
        </EditEventPlaceholder>
      </Background>
    </>
  );
};

export default EditEvent;
