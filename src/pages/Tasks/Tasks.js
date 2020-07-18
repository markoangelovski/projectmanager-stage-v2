import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

import { TasksWrapper, TaskMenu, TaskMenuItem } from "./Tasks.styles";

import TaskListItem from "../../components/TaskListItem/TaskListItem";

const Tasks = ({ taskId }) => {
  const {
    projects,
    tasks,
    /* fetching, */ hasMoreTasks,
    tasksSkip
  } = useStoreState(state => state);
  const { getProjects, getTasks } = useStoreActions(actions => actions);

  // Menu display state
  const [upcoming, setUpcoming] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);

  console.log("<Tasks>", tasks.length);

  useEffect(() => {
    // Fetch Projects
    if (projects.length === 0) getProjects();

    if (!localStorage.tasksMenu) localStorage.tasksMenu = "in_progress";
    if (localStorage.tasksMenu === "upcoming") {
      setUpcoming(true);
    } else if (localStorage.tasksMenu === "in_progress") {
      setInProgress(true);
    } else if (localStorage.tasksMenu === "completed") {
      setCompleted(true);
    }
    // eslint-disable-next-line
  }, []);

  const selectMenu = e => {
    const type = e.target.dataset.type || e.target.parentNode.dataset.type;
    if (type === "upcoming") {
      localStorage.tasksMenu = "upcoming";
      setUpcoming(true);
      setInProgress(false);
      setCompleted(false);
    } else if (type === "in_progress") {
      localStorage.tasksMenu = "in_progress";
      setUpcoming(false);
      setInProgress(true);
      setCompleted(false);
    } else if (type === "completed") {
      localStorage.tasksMenu = "completed";
      setUpcoming(false);
      setInProgress(false);
      setCompleted(true);
    }
  };

  const fetchData = () => {
    hasMoreTasks && getTasks(tasksSkip.toString());
  };

  // if (fetching) return <div>Loading tasks...</div>;

  return (
    <TasksWrapper>
      <TaskMenu
        upcoming={upcoming}
        inProgress={inProgress}
        completed={completed}
      >
        <TaskMenuItem data-type="upcoming" onClick={e => selectMenu(e)}>
          <FaHandRock data-type="upcoming" />
        </TaskMenuItem>
        <TaskMenuItem data-type="in_progress" onClick={e => selectMenu(e)}>
          <FaHandPaper data-type="in_progress" />
        </TaskMenuItem>
        <TaskMenuItem data-type="completed" onClick={e => selectMenu(e)}>
          <FaHandScissors data-type="completed" />
        </TaskMenuItem>
      </TaskMenu>
      {tasks && (
        <InfiniteScroll
          dataLength={tasks.length}
          next={fetchData}
          hasMore={hasMoreTasks}
          loader={<div>Loading tasks...</div>}
          refreshFunction={fetchData}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          {tasks.map(task => (
            <TaskListItem key={task._id} taskId={task._id} />
          ))}
        </InfiniteScroll>
      )}
    </TasksWrapper>
  );
};

export default Tasks;
