import React from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeProjects = props => {
  return (
    <Link to="/projects">
      <div className="box">
        <FaProjectDiagram />
      </div>
    </Link>
  );
};

export default HomeProjects;
