import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import moment from "moment";

import EventPicker from "../../components/EventPicker/EventPicker";
import EventList from "../../components/EventList/EventList";
import EventSubmit from "../../components/EventSubmit/EventSubmit";

const Events = () => {
  const [start, setStart] = useState(
    moment()
      .subtract(1, "week")
      .format("YYYY-MM-DD")
  );
  const [end, setEnd] = useState(moment().format("YYYY-MM-DD"));
  const [selectError, setSelectError] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDuration, setEventDuration] = useState(Number);

  const { events, fetching } = useStoreState(state => state);
  console.log("<Events>", events);

  const getEvents = useStoreActions(actions => actions.getEvents);
  const submitEvents = useStoreActions(actions => actions.submitEvents);

  const getEventsPayload = `start=${start}&end=${end}`;
  const createEventPayload = {
    day: moment().format("YYYY-MM-DD"),
    events: [
      {
        title: eventTitle,
        duration: eventDuration
      }
    ]
  };

  const getEventsCall = () => {
    if (new Date(start) > new Date(end)) {
      setSelectError(true);
      setInitialTimeFrame();
    } else {
      setSelectError(false);
      getEvents(getEventsPayload);
      setInitialTimeFrame();
    }
  };

  const submitEventsCall = () => {
    submitEvents(createEventPayload);
    setInitialTimeFrame();
  };

  const setInitialTimeFrame = () => {
    setStart(
      moment()
        .subtract(1, "week")
        .format("YYYY-MM-DD")
    );
    setEnd(moment().format("YYYY-MM-DD"));
  };

  useEffect(() => {
    if (events.length === 0) getEvents(getEventsPayload);
    // eslint-disable-next-line
  }, []);

  if (fetching) return <div>Loading events...</div>;

  return (
    <>
      <EventSubmit
        actions={{
          submitEventsCall,
          setEventTitle,
          eventTitle,
          setEventDuration,
          eventDuration
        }}
      />
      <EventList events={events} />
      <EventPicker
        getEventsCall={getEventsCall}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        selectError={selectError}
      />
    </>
  );
};

export default Events;
