import React from "react";
import { IconContext } from "react-icons";
import {
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaCalendarAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { Ul } from "./Nav.styles";

function Nav() {
  return (
    <IconContext.Provider
      value={{
        style: {
          verticalAlign: "middle"
        } /* , className: "global-class-name" */
      }}
    >
      <nav>
        <Ul>
          <li>
            <Link to="/">
              <FaHome />
            </Link>
          </li>
          <li>
            <Link to="/projects">
              <FaProjectDiagram />
            </Link>
          </li>
          <li>
            <Link to="/kanban">
              <FaTasks />
            </Link>
          </li>
          <li>
            <Link to="/events">
              <FaCalendarAlt />
            </Link>
          </li>
        </Ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Nav;
