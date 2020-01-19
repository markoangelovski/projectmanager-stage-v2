import React from "react";

import { EventBody, EventItem } from "./Event.styles";

const Event = props => {
  return (
    <>
      <EventBody>
        <EventItem>Naslov Eventa</EventItem>
        <EventItem>9h</EventItem>
      </EventBody>
      <div>Title: {props.event.title}</div>
      <div>Duration: {props.event.duration}</div>
      <div>Task: {props.event.task}</div>
      <div>Day: {props.event.day}</div>
      <div>Booked: {props.event.booked ? "Yes" : "No"}</div>
    </>
  );
};

export default Event;
