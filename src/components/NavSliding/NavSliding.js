import React, { useState } from "react";

import { NavSlidingPlaceholder } from "./NavSliding.styles";

import FloatingClock from "../FloatingClock/FloatingClock";
import FloatingEvent from "../FloatingEvent/FloatingEvent";
import Overlay from "../Overlay/Overlay";

const NavSliding = props => {
  const [hide, setHide] = useState(false);

  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);

  var xDown = null;
  //   var yDown = null; // Y position

  function getTouches(evt) {
    return (
      evt.touches || evt.originalEvent.touches // browser API
    ); // jQuery
  }

  function handleTouchStart(evt) {
    xDown = getTouches(evt)[0].clientX;
    // yDown = getTouches(evt)[0].clientY; // Y position
  }

  function handleTouchMove(evt) {
    if (!xDown /* || !yDown */) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    // var yUp = evt.touches[0].clientY; // Y position

    var xDiff = xDown - xUp;
    // var yDiff = yDown - yUp; // Y position

    // if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* left swipe */
      setHide(false);
    } else {
      /* right swipe */
      setHide(true);
    }
    // } else {
    //   if (yDiff > 0) {
    //     /* up swipe */
    //   } else {
    //     /* down swipe */
    //   }
    // }
    /* reset values */
    xDown = null;
    // yDown = null;
  }
  return (
    <NavSlidingPlaceholder>
      <Overlay test1={"test1"} />
      <div style={hide ? { display: "none" } : {}}>
        <FloatingEvent />
        <FloatingClock />
      </div>
    </NavSlidingPlaceholder>
  );
};

export default NavSliding;
