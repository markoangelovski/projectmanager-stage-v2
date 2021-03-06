import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaTasks } from "react-icons/fa";

import {
  ProjectBody,
  ProjectDetailWrapper,
  ProjectTitle,
  ProjectDetail,
  ProjectDescription,
  ProjectTaskCount
} from "./ProjectsListItem.styles";

const ProjectListItem = ({ project }) => {
  return (
    <ProjectBody>
      <Link to={`/projects/${project._id}`}>
        <ProjectDetailWrapper>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectDetail>
            {moment(project.date).format("MMM Do, 'YY.")}
          </ProjectDetail>
        </ProjectDetailWrapper>
        <ProjectDescription>{project.description}</ProjectDescription>
        <ProjectDetailWrapper>
          <ProjectDetail>{project.pl}</ProjectDetail>
          <ProjectTaskCount>
            <FaTasks />
            {project.openTasksCount || 0} | {project.closedTasksCount || 0}
          </ProjectTaskCount>
        </ProjectDetailWrapper>
      </Link>
    </ProjectBody>
  );
};

export default ProjectListItem;
