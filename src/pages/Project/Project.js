import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { FaInfo, FaTasks, FaCode } from "react-icons/fa";

import {
  ProjectWrapper,
  ProjectMenu,
  ProjectMenuItem,
  ProjectSource
} from "./Project.styles";

import ProjectDetailsItem from "../../components/ProjectDetailsItem/ProjectDetailsItem";
import TaskListItem from "../../components/TaskListItem/TaskListItem";

const Project = props => {
  const { projects, fetching } = useStoreState(state => state);

  const getProjects = useStoreActions(actions => actions.getProjects);

  const [info, setInfo] = useState(false);
  const [tasks, setTasks] = useState(false);
  const [json, setJson] = useState(false);

  const selectedProject = projects.find(
    project => props.match.params.projectId === project._id
  );
  console.log("<Project>", selectedProject);

  useEffect(() => {
    if (projects.length === 0) getProjects();

    if (!localStorage.projectMenu) localStorage.projectMenu = "info";
    if (localStorage.projectMenu === "info") {
      setInfo(true);
    } else if (localStorage.projectMenu === "tasks") {
      setTasks(true);
    } else if (localStorage.projectMenu === "json") {
      setJson(true);
    }
    // eslint-disable-next-line
  }, []);

  const selectMenu = e => {
    const type = e.target.dataset.type || e.target.parentNode.dataset.type;
    if (type === "info") {
      localStorage.projectMenu = "info";
      setInfo(true);
      setTasks(false);
      setJson(false);
    } else if (type === "tasks") {
      localStorage.projectMenu = "tasks";
      setInfo(false);
      setTasks(true);
      setJson(false);
    } else if (type === "json") {
      localStorage.projectMenu = "json";
      setInfo(false);
      setTasks(false);
      setJson(true);
    }
  };

  if (fetching) return <div>Loading project...</div>;

  return selectedProject ? (
    <ProjectWrapper>
      <ProjectMenu info={info} tasks={tasks} json={json}>
        <ProjectMenuItem data-type="info" onClick={e => selectMenu(e)}>
          <FaInfo data-type="info" />
        </ProjectMenuItem>
        <ProjectMenuItem data-type="tasks" onClick={e => selectMenu(e)}>
          <FaTasks data-type="tasks" />
        </ProjectMenuItem>
        <ProjectMenuItem data-type="json" onClick={e => selectMenu(e)}>
          <FaCode data-type="json" />
        </ProjectMenuItem>
      </ProjectMenu>
      {info && <ProjectDetailsItem project={selectedProject} />}
      {tasks &&
        selectedProject.tasks.map(task => (
          <TaskListItem
            key={task}
            projectId={props.match.params.projectId}
            taskId={task}
          />
        ))}
      {json && (
        <ProjectSource>
          <code>{JSON.stringify(selectedProject, null, 5)}</code>
        </ProjectSource>
      )}
    </ProjectWrapper>
  ) : (
    <div>Project not found.</div>
  );
};

export default Project;
