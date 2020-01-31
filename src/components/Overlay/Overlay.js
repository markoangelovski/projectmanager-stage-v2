import React from "react";
import { useStoreState } from "easy-peasy";

import { OverlayPlaceholder, OverlayContainer } from "./Overlay.styles";

import EventSubmit from "../EventSubmit/EventSubmit";
import TaskPicker from "../TaskPicker/TaskPicker";

const Overlay = props => {
  const { overlay } = useStoreState(state => state);
  console.log("props.childerb", props);

  if (overlay) {
    return (
      <OverlayPlaceholder>
        <OverlayContainer>
          <EventSubmit />
          <TaskPicker />
        </OverlayContainer>
      </OverlayPlaceholder>
    );
  }
  return null;
};

export default Overlay;
