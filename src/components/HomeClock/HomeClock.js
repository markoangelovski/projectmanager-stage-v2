import React from "react";
import { FaRegClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeClock = props => {
  return (
    <Link to="/clock">
      <div className="box">
        <FaRegClock />
      </div>
    </Link>
  );
};

export default HomeClock;
