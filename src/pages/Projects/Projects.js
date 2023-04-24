import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { FaFile } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  ProjectsWrapper,
  ProjectMenu,
  ProjectMenuItem
} from "./Projects.styles";

import NewProject from "../../components/NewProject/NewProject";
import ProjectsListItem from "../../components/ProjectsListItem/ProjectsListItem";

const Projects = props => {
  const [newProject, setNewProject] = useState(false);

  const {
    projects,
    /* fetching, */ hasMoreProjects,
    projectsSkip
  } = useStoreState(state => state);
  console.log("<Projects>", projects.length);

  const { getProjects } = useStoreActions(actions => actions);

  useEffect(() => {
    if (projects.length === 0) getProjects();
    // eslint-disable-next-line
  }, []);

  const fetchData = () => {
    getProjects(projectsSkip.toString());
  };

  // if (fetching) return <div>Loading projects...</div>;

  return (
    <ProjectsWrapper id="project-list-wrapper">
      <ProjectMenu>
        <ProjectMenuItem>
          <FaFile onClick={() => setNewProject(true)} />
        </ProjectMenuItem>
        {newProject && <NewProject setNewProject={setNewProject} />}
      </ProjectMenu>
      <InfiniteScroll
        dataLength={projects.length}
        next={fetchData}
        hasMore={hasMoreProjects}
        loader={<div>Loading projects...</div>}
      >
        {projects.map(project => (
          <ProjectsListItem key={project._id} project={project} />
        ))}
      </InfiniteScroll>
    </ProjectsWrapper>
  );
};

export default Projects;
