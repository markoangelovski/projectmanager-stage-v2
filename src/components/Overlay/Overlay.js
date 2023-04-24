import React from "react";
import { useStoreState } from "easy-peasy";

import { OverlayPlaceholder, OverlayContainer } from "./Overlay.styles";

import EventSubmit from "../EventSubmit/EventSubmit";
import TaskPicker from "../TaskPicker/TaskPicker";
import SearchTask from "../SearchTask/SearchTask";

const Overlay = props => {
  const { overlay } = useStoreState(state => state);
  console.log("props.children", props);

  if (overlay) {
    return (
      <OverlayPlaceholder>
        <OverlayContainer>
          <EventSubmit />
          <TaskPicker />
          <SearchTask />
        </OverlayContainer>
      </OverlayPlaceholder>
    );
  }
  return null;
};

export default Overlay;
