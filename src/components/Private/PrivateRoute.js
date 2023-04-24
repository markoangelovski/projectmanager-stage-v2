import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = props => {
  console.log("props", props);
  const { component: Component, loggedInStatus, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props => {
        if (loggedInStatus) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
