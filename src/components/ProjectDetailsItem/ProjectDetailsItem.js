import React from "react";
import moment from "moment";
import { FaBan, FaCheck, FaTasks } from "react-icons/fa";

import {
  ProjectBody,
  ProjectDetailWrapper,
  ProjectTitle,
  ProjectDetail,
  ProjectDescription,
  ProjectLink,
  ProjectTaskCount
} from "./ProjectDetailsItem.styles";

const ProjectListItem = ({ project }) => {
  return (
    <ProjectBody>
      <ProjectDetailWrapper>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectDetail>
          {moment(project.date).format("MMM Do, 'YY.")}
        </ProjectDetail>
      </ProjectDetailWrapper>
      <ProjectDetail>Program Lead:</ProjectDetail>
      <ProjectDescription>{project.pl}</ProjectDescription>
      <ProjectDetail>Description:</ProjectDetail>
      <ProjectDescription>{project.description}</ProjectDescription>
      <ProjectDetail>NAS:</ProjectDetail>
      <ProjectDescription>{project.nas}</ProjectDescription>
      <ProjectDetail>Kanboard:</ProjectDetail>
      <ProjectDescription>
        <ProjectLink href={project.kanboard} target="_blank">
          {project.kanboard}
        </ProjectLink>
      </ProjectDescription>
      <ProjectDetail>Dev:</ProjectDetail>
      <ProjectDescription>
        <ProjectLink href={project.dev} target="_blank">
          {project.dev}
        </ProjectLink>
      </ProjectDescription>
      <ProjectDetail>Stage:</ProjectDetail>
      <ProjectDescription>
        <ProjectLink href={project.stage} target="_blank">
          {project.stage}
        </ProjectLink>
      </ProjectDescription>
      <ProjectDetail>Prod:</ProjectDetail>
      <ProjectDescription>
        <ProjectLink href={project.prod} target="_blank">
          {project.prod}
        </ProjectLink>
      </ProjectDescription>
      <ProjectDetail>Live:</ProjectDetail>
      <ProjectDescription>
        <ProjectLink href={project.live} target="_blank">
          {project.live}
        </ProjectLink>
      </ProjectDescription>
      <ProjectTaskCount>
        <ProjectDetailWrapper>
          <div>
            {project.done ? <FaCheck /> : <FaBan />}
            <FaTasks />
            {project.tasks.length}
          </div>
        </ProjectDetailWrapper>
      </ProjectTaskCount>
    </ProjectBody>
  );
};

export default ProjectListItem;
