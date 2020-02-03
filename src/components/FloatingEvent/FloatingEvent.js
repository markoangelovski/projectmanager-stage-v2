import React, { useEffect } from "react";
import { IconContext } from "react-icons";
import { FaPaperPlane } from "react-icons/fa";
import { useStoreState, useStoreActions } from "easy-peasy";

import { FloatingEventStyle } from "./FloatingEvent.styles";

import Overlay from "../Overlay/Overlay";

const FloatingEvent = () => {
  const { tasks } = useStoreState(state => state);
  const { getTasks, toggleOverlay } = useStoreActions(actions => actions);

  useEffect(() => {
    tasks.length === 0 && getTasks();
    // eslint-disable-next-line
  }, []);

  const displayOverlay = () => {
    toggleOverlay();
    return <Overlay test1={"test2"} />;
  };

  return (
    <>
      <IconContext.Provider
        value={{
          style: {
            verticalAlign: "middle",
            height: "1.5em",
            width: "1.5em",
            position: "relative",
            top: "8px",
            left: "-2px"
          } /* , className: "global-class-name" */
        }}
      >
        <FloatingEventStyle>
          <div>
            <FaPaperPlane onClick={() => displayOverlay()} />
          </div>
        </FloatingEventStyle>
      </IconContext.Provider>
    </>
  );
};

export default FloatingEvent;
