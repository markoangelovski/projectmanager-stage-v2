import React from "react";
import { FaHome, FaProjectDiagram, FaTasks, FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">
        <button type="button">
          <FaHome />
        </button>
      </Link>
      <Link to="/projects">
        <button type="button">
          <FaProjectDiagram />
        </button>
      </Link>
      <Link to="/kanban">
        <button type="submit">
          <FaTasks />
        </button>
      </Link>
      <Link to="/events">
        <button>
          <FaCalendar />
        </button>
      </Link>
    </nav>
  );
}

export default Nav;
