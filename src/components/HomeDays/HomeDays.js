import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeDays = () => {
  return (
    <Link to="/days">
      <div className="box">
        <FaCalendarAlt />
      </div>
    </Link>
  );
};

export default HomeDays;
