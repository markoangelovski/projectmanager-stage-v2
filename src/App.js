import React, { useState, useEffect } from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";
import { StoreProvider } from "easy-peasy";

// Pages
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Project from "./pages/Project/Project";
import Tasks from "./pages/Tasks/Tasks";
import Task from "./pages/Task/Task";
import Days from "./pages/Days/Days";
import Day from "./pages/Day/Day";
import Clock from "./pages/Clock/Clock";
//import Error404 from "./pages/Error/Error"; Not working

// Components
import MainMenu from "./components/MainMenu/MainMenu";
import Nav from "./components/Nav/Nav";
import FloatingClock from "./components/FloatingClock/FloatingClock";
import FloatingEvent from "./components/FloatingEvent/FloatingEvent";
import Overlay from "./components/Overlay/Overlay";
import Login from "./components/Login/Login";
import { Background } from "./components/Login/Login.styles";

import { checkAuthCall } from "./lib/drivers/User/user.driver";

import Store from "./lib/context/Model";

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState(null);
  const [user, setUser] = useState({});
  // API not available
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const login = async () => {
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
    };
    login();
  }, []);

  if (loggedInStatus === null) {
    return <Background />;
  }
  if (loggedInStatus) {
    return (
      <>
        <MainMenu user={user}></MainMenu>
        <Nav />
        <Switch>
          <StoreProvider store={Store}>
            <Route
              exact
              path="/"
              render={props => <Home {...props} user={user} />}
            />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/projects/:projectId" component={Project} />
            <Route
              exact
              path="/projects/:projectId/tasks/:taskId"
              component={Task}
            />
            <Route exact path="/kanban" component={Tasks} />
            <Route exact path="/days" component={Days} />
            <Route exact path="/days/:dayId" component={Day} />
            <Route exact path="/clock" component={Clock} />
            <Overlay test1={"test1"} />
            <FloatingEvent />
          </StoreProvider>
          {/* <Route component={Error404} /> Not working */}
        </Switch>
        <FloatingClock />
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
