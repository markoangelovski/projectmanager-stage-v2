import React from "react";
import { FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeTasks = props => {
  return (
    <Link to="/kanban">
      <div className="box">
        <FaTasks />
      </div>
    </Link>
  );
};

export default HomeTasks;
