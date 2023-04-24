import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import moment from "moment";

const DayList = () => {
  const { dayStart, dayEnd, days, fetching } = useStoreState(state => state);
  const { getDays } = useStoreActions(actions => actions);
  console.log("<EventList>", days);

  const getDaysPayload = `start=${dayStart}&end=${dayEnd}`;

  useEffect(() => {
    if (days.length <= 1) getDays(getDaysPayload);
    // eslint-disable-next-line
  }, []);

  if (fetching) return <div>Loading events...</div>;

  return (
    <table>
      {days.map(day => {
        return (
          <Fragment key={day._id}>
            <thead>
              <tr>
                <th>Day:</th>
                <th>{moment(day.date).format("MMMM Do YYYY")}</th>
                <th>Total: {day.events.length}</th>
                <th>
                  <Link to={`/days/${day._id}`}>Go</Link>
                </th>
              </tr>
            </thead>
          </Fragment>
        );
      })}
    </table>
  );
};

export default DayList;
