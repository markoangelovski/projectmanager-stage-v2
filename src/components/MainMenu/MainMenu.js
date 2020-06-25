import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import moment from "moment";

import { MainMenuStyle, TimePaceholder } from "./MainMenu.styles";

const MainMenu = props => {
  const [time, setTime] = useState(new Date().getTime());

  const { dayStartHour, getComputedDay } = useStoreState(state => state);

  setInterval(() => {
    setTime(new Date().getTime());
  }, 60000);

  return (
    <>
      <MainMenuStyle>
        <TimePaceholder>
          {`${moment(time).format("HH:mm")} | ${dayStartHour} | ${
            getComputedDay[4]
          }`}
        </TimePaceholder>
        <img src={props.user.avatar_url} alt="Profile pic" />
      </MainMenuStyle>
    </>
  );
};

export default MainMenu;
