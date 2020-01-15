import React from "react";
import { IconContext } from "react-icons";

import HomeEvents from "../HomeEvents/HomeEvents";
import HomeTasks from "../HomeTasks/HomeTasks";
import HomeProjects from "../HomeProjects/HomeProjects";

import { Boxes } from "./Body.styles";

const Body = props => {
  return (
    <IconContext.Provider
      value={{
        style: {
          verticalAlign: "middle",
          height: "2.5em",
          width: "2.5em"
        } /* , className: "global-class-name" */
      }}
    >
      <Boxes>
        <HomeEvents />
        <HomeTasks />
        <HomeProjects />
      </Boxes>
    </IconContext.Provider>
  );
};

export default Body;
