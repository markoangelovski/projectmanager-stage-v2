import React, { useState, useEffect } from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";
import { StoreProvider } from "easy-peasy";

import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Project from "./pages/Project/Project";
import Tasks from "./pages/Tasks/Tasks";
import Task from "./pages/Task/Task";
import Events from "./pages/Events/Events";

import Nav from "./components/Nav/Nav";
import Login from "./components/Login/Login";

import { checkAuthCall } from "./lib/drivers/User/user.driver";

import Store from "./lib/context/Model";

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState(null);
  const [user, setUser] = useState({});
  // API not available
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const check = await checkAuthCall();
        if (check.user) {
          setLoggedInStatus(true);
          setUser(check.user);
        } else if (check.error) {
          setLoggedInStatus(false);
          setUser({});
        }
      } catch (error) {
        console.warn(error);
        setLoggedInStatus(false);
        setUser({});
        setApiError(true);
      }
    })();
  }, []);

  if (loggedInStatus === null) {
    return <div>Authenticating...</div>;
  }

  if (loggedInStatus) {
    return (
      <>
        <Nav />
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Home {...props} user={user} />}
          />
          <StoreProvider store={Store}>
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/projects/:projectId" component={Project} />
            <Route exact path="/projects/:projectId/tasks" component={Tasks} />
            <Route
              exact
              path="/projects/:projectId/tasks/:taskId"
              component={Task}
            />
            <Route exact path="/kanban" component={Tasks} />
            <Route exact path="/events" component={Events} />
          </StoreProvider>
        </Switch>
      </>
    );
  }
  return (
    <>
      <Login
        setLoggedInStatus={setLoggedInStatus}
        setUser={setUser}
        apiError={apiError}
      />
    </>
  );
};

export default App;
