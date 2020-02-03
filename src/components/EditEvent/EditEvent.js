import React, { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { FaPaperPlane } from "react-icons/fa";

import TaskPicker from "../TaskPicker/TaskPicker";

import {
  Background,
  EditEventPlaceholder,
  EditEventForm,
  EditEventInput,
  EditEventSubmitButton,
  EditEventDuration,
  EditEventSetDuration,
  EditEventWarning
} from "./EditEvent.styles";

const EditEvent = props => {
  const [title, setTitle] = useState(props.event.title);
  const [duration, setDuration] = useState(props.event.duration);
  const [inputAllowed, setInputAllowed] = useState(false);

  const { selectedTask } = useStoreState(state => state);
  const { updateEvent } = useStoreActions(actions => actions);

  const editEventCall = () => {
    const payload = [
      {
        propName: "title",
        propValue: title
      },
      {
        propName: "duration",
        propValue: duration
      }
    ];

    if (selectedTask.length > 0)
      payload.push({
        propName: "task",
        propValue: selectedTask
      });
    console.log("payload", payload);
    if (payload[0].propValue.length > 0) {
      updateEvent({
        eventId: props.event._id,
        payload
      });
      props.setEdit(false);
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
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <EditEventSubmitButton title={title ? title.toString() : undefined}>
              <FaPaperPlane onClick={e => editEventCall(e)} />
            </EditEventSubmitButton>
            <EditEventDuration>
              <EditEventSetDuration
                type="range"
                step="0.25"
                min="0.25"
                max="7.5"
                value={duration}
                onChange={e => setDuration(e.target.value)}
              />
              {duration}
            </EditEventDuration>
          </EditEventForm>
          {!props.event.task && <TaskPicker />}
          {inputAllowed && (
            <EditEventWarning>Title field is mandatory!</EditEventWarning>
          )}
        </EditEventPlaceholder>
      </Background>
    </>
  );
};

export default EditEvent;
