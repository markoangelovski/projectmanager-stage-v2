import React from "react";

const Event = props => {
  return (
    <>
      <div>Title: {props.event.title}</div>
      <div>Duration: {props.event.duration}</div>
      <div>Task: {props.event.task}</div>
      <div>Day: {props.event.day}</div>
      <div>Booked: {props.event.booked ? "Yes" : "No"}</div>
    </>
  );
};

export default Event;
