import React from "react";

import { MainMenuStyle } from "./MainMenu.styles";

const MainMenu = props => {
  return (
    <>
      <MainMenuStyle>
        <img src={props.user.avatar_url} alt="Profile pic" />
      </MainMenuStyle>
    </>
  );
};

export default MainMenu;
