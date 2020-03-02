import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import {
  /* FaFile, */ FaHandRock,
  FaHandPaper,
  FaHandScissors
} from "react-icons/fa";

import { TasksWrapper, TaskMenu, TaskMenuItem } from "./Tasks.styles";

// import NewTask from "../../components/NewTask/NewTask";
import TaskListItem from "../../components/TaskListItem/TaskListItem";

const Tasks = ({ taskId }) => {
  const { projects, tasks, fetching } = useStoreState(state => state);
  const { getProjects } = useStoreActions(actions => actions);

  // New task state
  // const [newTask, setNewTask] = useState(false);

  // Menu display state
  const [upcoming, setUpcoming] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);

  const upcomingArr = [],
    inProgressArr = [],
    completedArr = [];

  tasks.forEach(task => {
    if (task.column === "Upcoming") {
      upcomingArr.push(task);
    } else if (task.column === "In Progress") {
      inProgressArr.push(task);
    } else if (task.column === "Completed") {
      completedArr.push(task);
    }
  });

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

  if (fetching) return <div>Loading tasks...</div>;

  return (
    <TasksWrapper>
      <TaskMenu
        upcoming={upcoming}
        inProgress={inProgress}
        completed={completed}
      >
        {/* <TaskMenuItem>
          <FaFile onClick={() => setNewTask(true)} />
        </TaskMenuItem> */}
        {/* {newTask && <NewTask setNewTask={setNewTask} />} */}
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
      {upcoming &&
        upcomingArr.map(task => (
          <TaskListItem key={task._id} taskId={task._id} />
        ))}
      {inProgress &&
        inProgressArr.map(task => (
          <TaskListItem key={task._id} taskId={task._id} />
        ))}
      {completed &&
        completedArr.map(task => (
          <TaskListItem key={task._id} taskId={task._id} />
        ))}
    </TasksWrapper>
  );
};

export default Tasks;
