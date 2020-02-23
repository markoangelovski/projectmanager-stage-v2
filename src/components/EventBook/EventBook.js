import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { FaPaperPlane } from "react-icons/fa";

import { bookEventCall } from "../../lib/drivers/Booking/booking.driver";

import {
  Background,
  BookEventPlaceholder,
  BookEventForm,
  BookEventInput,
  BookEventSubmitButton,
  BookEventDuration,
  BookEventWarning
} from "./EventBook.styles";

const BookEvent = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedTaskTitle, setSelectedTaskTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [scr, setScr] = useState("");
  const [eventBooked, setEventBooked] = useState(false);
  const [bookingError, setBookingError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { eventTitle, eventDuration, selectedTask, tasks } = useStoreState(
    state => state
  );
  const {
    setEventTitle,
    setEventDuration,
    setSelectedTask,
    setInitialDayValues
  } = useStoreActions(actions => actions);

  const selectedTaskDetails = tasks.find(task => task._id === selectedTask);

  useEffect(() => {
    setEventTitle(props.event.title);
    setEventDuration(props.event.duration);
    setSelectedTask(props.event.task);
    selectedTaskDetails && setSelectedTaskTitle(selectedTaskDetails.title);
    return () => {
      // Reset initial values each time component unmounts
      setInitialDayValues();
    };
    //eslint-disable-next-line
  }, [selectedTaskDetails]);

  const bookEventCallFoo = async () => {
    setBookingError(false);
    setEventBooked(false);
    setLoading(true);

    const payload = {
      username,
      password,
      event: props.event._id
    };

    if (username && password && selectedTaskTitle) {
      const bookedEvent = await bookEventCall(payload);

      if (!bookedEvent.error) {
        setMsg(bookedEvent.message);
        setScr(bookedEvent.scr);
        setBookingError(false);
        setEventBooked(true);
        setLoading(false);
      } else {
        setMsg(bookedEvent.message);
        setBookingError(true);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Background
        className="background"
        onClick={e =>
          e.target.classList.value.includes("background") &&
          props.setBooking(false)
        }
      >
        <BookEventPlaceholder>
          {!eventBooked && (
            <BookEventForm>
              <BookEventInput
                title={eventTitle}
                disabled={true}
                type="text"
                placeholder="Title"
                value={eventTitle}
              />
              <BookEventDuration>{eventDuration}</BookEventDuration>
              <BookEventInput
                disabled={true}
                type="text"
                value={selectedTaskTitle}
              />
              <BookEventInput
                placeholder="Kanboard Username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <BookEventInput
                placeholder="Kanboard Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {bookingError && (
                <BookEventWarning error={bookingError}>{msg}</BookEventWarning>
              )}
              {loading && (
                <BookEventWarning>
                  Loading... Please provide up to 15 seconds to complete the
                  booking.
                </BookEventWarning>
              )}
            </BookEventForm>
          )}
          {!eventBooked && (
            <BookEventSubmitButton>
              <FaPaperPlane onClick={e => bookEventCallFoo(e)} />
            </BookEventSubmitButton>
          )}
          {eventBooked && (
            <>
              <img alt="Booking Screenshot" src={scr} />
              <BookEventWarning>{msg}</BookEventWarning>
            </>
          )}
        </BookEventPlaceholder>
      </Background>
    </>
  );
};

export default BookEvent;
