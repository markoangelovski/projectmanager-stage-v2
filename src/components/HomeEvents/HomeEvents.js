import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeEvents = props => {
  return (
    <Link to="/events">
      <div className="box">
        <FaCalendarAlt />
      </div>
    </Link>
  );
};

export default HomeEvents;
