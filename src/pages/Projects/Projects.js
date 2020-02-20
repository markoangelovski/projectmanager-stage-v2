import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { FaFile } from "react-icons/fa";

import {
  ProjectsWrapper,
  ProjectMenu,
  ProjectMenuItem
} from "./Projects.styles";

import NewProject from "../../components/NewProject/NewProject";
import ProjectsListItem from "../../components/ProjectsListItem/ProjectsListItem";

const Projects = props => {
  const [newProject, setNewProject] = useState(false);

  const { projects, fetching } = useStoreState(state => state);
  console.log("<Projects>", projects);

  const getProjects = useStoreActions(actions => actions.getProjects);

  useEffect(() => {
    if (projects.length === 0) getProjects();
    // eslint-disable-next-line
  }, []);

  if (fetching) return <div>Loading projects...</div>;

  return (
    <ProjectsWrapper>
      <ProjectMenu>
        <ProjectMenuItem>
          <FaFile onClick={() => setNewProject(true)} />
        </ProjectMenuItem>
        {newProject && <NewProject setNewProject={setNewProject} />}
      </ProjectMenu>
      {projects.map(project => {
        return <ProjectsListItem key={project._id} project={project} />;
      })}
    </ProjectsWrapper>
  );
};

export default Projects;
