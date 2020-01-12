import React, { Fragment } from "react";
import moment from "moment";

const EventList = props => {
  return (
    <table>
      {props.events.map(day => {
        return (
          <Fragment key={day._id}>
            <thead>
              <tr>
                <th>Events:</th>
                <th>{moment(day.date).format("MMMM Do YYYY")}</th>
              </tr>
            </thead>
            {day.events.map(event => {
              return (
                <Fragment key={event._id}>
                  <tbody>
                    <tr>
                      <td>{event.title}</td>
                      <td>{event.duration}</td>
                    </tr>
                  </tbody>
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </table>
  );
};

export default EventList;
