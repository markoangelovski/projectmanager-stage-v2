import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

import {
  EventDurationStepPlaceholder,
  EventDurationStepIncrement
} from "./EventDurationStep.styles";

const EventDurationStep = () => {
  const { eventDuration } = useStoreState(state => state);
  const { setEventDuration } = useStoreActions(actions => actions);

  return (
    <>
      <EventDurationStepPlaceholder>
        <EventDurationStepIncrement
          onClick={() =>
            eventDuration > 0.25 && setEventDuration(eventDuration - 0.25)
          }
        >
          -
        </EventDurationStepIncrement>
        <EventDurationStepIncrement
          onClick={() =>
            eventDuration < 7.5 && setEventDuration(eventDuration + 0.25)
          }
        >
          +
        </EventDurationStepIncrement>
      </EventDurationStepPlaceholder>
    </>
  );
};

export default EventDurationStep;
