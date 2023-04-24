import React from "react";
import { IconContext } from "react-icons";
import { FaRegClock } from "react-icons/fa";
import { Link } from "react-router-dom";

import { FloatingClockStyle } from "./FloatingClock.styles";

const FloatingClock = () => {
  return (
    <>
      <IconContext.Provider
        value={{
          style: {
            verticalAlign: "middle",
            height: "2.5em",
            width: "2.5em"
          } /* , className: "global-class-name" */
        }}
      >
        <Link to="/clock">
          <FloatingClockStyle>
            <div>
              <FaRegClock />
            </div>
          </FloatingClockStyle>
        </Link>
      </IconContext.Provider>
    </>
  );
};

export default FloatingClock;
