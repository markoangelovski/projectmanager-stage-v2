import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import { ProjectsWrapper } from "./Projects.styles";

import ProjectListItem from "../../components/ProjectsListItem/ProjectListItem";

const Projects = props => {
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
      {projects.map(project => {
        return <ProjectListItem key={project._id} project={project} />;
      })}
    </ProjectsWrapper>
  );
};

export default Projects;
