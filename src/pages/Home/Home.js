import React from "react";

const Home = props => {
  return (
    <>
      <div>Hello from Home {props.user.email}!</div>
      <img src={props.user.avatar_url} alt="Profile pic" />
    </>
  );
};

export default Home;
