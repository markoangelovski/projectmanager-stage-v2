import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { FaInfo, FaTasks, FaCode, FaFile } from "react-icons/fa";

import {
  ProjectWrapper,
  ProjectMenu,
  ProjectMenuItem,
  ProjectSource
} from "./Project.styles";

import ProjectDetailsItem from "../../components/ProjectDetailsItem/ProjectDetailsItem";
import TaskListItem from "../../components/TaskListItem/TaskListItem";
import NewTask from "../../components/NewTask/NewTask";

const Project = props => {
  const { projects, tasks, fetching } = useStoreState(state => state);

  const { getProjects, getTasksByProject } = useStoreActions(
    actions => actions
  );

  const [info, setInfo] = useState(false);
  const [taskMenu, setTaskMenu] = useState(false);
  const [json, setJson] = useState(false);

  const [tasksFetched, setTasksFetched] = useState(false);

  const [newTask, setNewTask] = useState(false);

  const selectedProject = projects.find(
    project => props.match.params.projectId === project._id
  );
  console.log(
    "<Project>",
    selectedProject && selectedProject.title,
    selectedProject && selectedProject._id
  );

  const projectTasks =
    selectedProject &&
    tasks.filter(task => task.project === selectedProject._id);

  // Does not fetch tasks if they are already fetched
  const taskCountMatch =
    selectedProject &&
    selectedProject.openTasksCount + selectedProject.closedTasksCount >
      projectTasks.length;

  const fetchTasks = () => {
    setTasksFetched(true);

    selectedProject &&
      !tasksFetched &&
      (selectedProject.openTasksCount || selectedProject.closedTasksCount) &&
      getTasksByProject(selectedProject._id);
  };

  useEffect(() => {
    if (projects.length === 0) getProjects();

    if (!localStorage.projectMenu) localStorage.projectMenu = "info";
    if (localStorage.projectMenu === "info") {
      setInfo(true);
    } else if (localStorage.projectMenu === "tasks") {
      setTaskMenu(true);
    } else if (localStorage.projectMenu === "json") {
      setJson(true);
    }

    // Fetch Tasks on initial page load if one of them is selected
    selectedProject &&
      !tasksFetched &&
      localStorage.projectMenu === "tasks" &&
      taskCountMatch &&
      (selectedProject.openTasksCount || selectedProject.closedTasksCount) &&
      fetchTasks();
    // eslint-disable-next-line
  }, []);

  const selectMenu = e => {
    const type = e.target.dataset.type || e.target.parentNode.dataset.type;
    if (type === "info") {
      localStorage.projectMenu = "info";
      setInfo(true);
      setTaskMenu(false);
      setJson(false);
    } else if (type === "tasks") {
      localStorage.projectMenu = "tasks";
      setInfo(false);
      setTaskMenu(true);
      setJson(false);
    } else if (type === "json") {
      localStorage.projectMenu = "json";
      setInfo(false);
      setTaskMenu(false);
      setJson(true);
    }
  };

  if (fetching) return <div>Loading project...</div>;

  return selectedProject ? (
    <ProjectWrapper>
      <ProjectMenu info={info} tasks={taskMenu} json={json}>
        <div>
          <ProjectMenuItem data-type="info" onClick={e => selectMenu(e)}>
            <FaInfo data-type="info" />
          </ProjectMenuItem>
          <ProjectMenuItem
            data-type="tasks"
            onClick={e => {
              selectMenu(e);
              fetchTasks();
            }}
          >
            <FaTasks data-type="tasks" />
          </ProjectMenuItem>
          <ProjectMenuItem data-type="json" onClick={e => selectMenu(e)}>
            <FaCode data-type="json" />
          </ProjectMenuItem>
        </div>
        <ProjectMenuItem onClick={e => setNewTask(true)}>
          <FaFile onClick={e => setNewTask(true)} />
        </ProjectMenuItem>
      </ProjectMenu>
      {info && <ProjectDetailsItem project={selectedProject} />}
      {taskMenu &&
        projectTasks.map(task => (
          <TaskListItem key={task._id} taskId={task._id} page="project" />
        ))}
      {json && (
        <ProjectSource>
          <code>{JSON.stringify(selectedProject, null, 5)}</code>
        </ProjectSource>
      )}

      {newTask && <NewTask setNewTask={setNewTask} project={selectedProject} />}
    </ProjectWrapper>
  ) : (
    <div>Project not found.</div>
  );
};

export default Project;
