import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { FaPaperPlane } from "react-icons/fa";
import moment from "moment";

import EventDurationStep from "../EventDurationStep/EventDurationStep";

import {
  EventForm,
  EventTitle,
  EventSetDuration,
  EventDuration,
  EventSubmitButton,
  DayStartHour,
  TiteContainer
} from "./EventSubmit.styles";

const EventSubmit = () => {
  const {
    eventTitle,
    eventDuration,
    dayStartHour,
    selectedTask
  } = useStoreState(state => state);

  const {
    setEventTitle,
    setEventDuration,
    setDayStartHour,
    submitDay,
    setInitialDayValues
  } = useStoreActions(actions => actions);

  const title = eventTitle.length > 0;

  useEffect(() => {
    return () => {
      // Reset initial values each time component unmounts
      setInitialDayValues();
    };
    //eslint-disable-next-line
  }, []);

  const submitDayCall = e => {
    e.preventDefault();
    const createEventPayload = {
      day: moment().format("YYYY-MM-DD"),
      task: selectedTask ? selectedTask : "",
      title: eventTitle,
      duration: eventDuration,
      start: dayStartHour
    };

    if (title) {
      submitDay(createEventPayload);
      setInitialDayValues();
    } else {
      return null;
    }
  };

  return (
    <EventForm onSubmit={e => e.preventDefault()}>
      <TiteContainer>
        <EventTitle
          onChange={e => setEventTitle(e.target.value)}
          type="text"
          placeholder="Enter Event Title:"
          value={eventTitle}
        ></EventTitle>
        <DayStartHour
          onChange={e =>
            setDayStartHour(
              parseFloat(e.target.value) > 0 &&
                parseFloat(e.target.value) < 23.99 &&
                parseFloat(e.target.value)
            )
          }
          type="number"
          placeholder="0"
          min="0"
          max="23.99"
          step="0.25"
          value={dayStartHour}
        ></DayStartHour>
      </TiteContainer>
      <EventSubmitButton title={title ? title.toString() : undefined}>
        <FaPaperPlane onClick={e => submitDayCall(e)} />
      </EventSubmitButton>
      <EventDuration>
        <EventSetDuration
          onChange={e => setEventDuration(parseFloat(e.target.value))}
          type="range"
          placeholder="Event duration"
          value={eventDuration}
          step="0.25"
          min="0.25"
          max="7.5"
        ></EventSetDuration>
        {eventDuration}
        <EventDurationStep />
      </EventDuration>
    </EventForm>
  );
};

export default EventSubmit;
