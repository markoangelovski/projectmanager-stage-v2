import React from "react";
import { Link } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import moment from "moment";
import {
  FaProjectDiagram,
  FaCheck,
  FaBan,
  FaStickyNote,
  FaRegClock
} from "react-icons/fa";

import {
  TaskBody,
  TaskDetailWrapper,
  TaskTitle,
  TaskDetail,
  TaskDescription,
  TaskIcon,
  TaskProjectLink
} from "./TaskListItem.styles";

const TaskListItem = ({ taskId, page }) => {
  const { projects, tasks } = useStoreState(state => state);

  const selectedTask = tasks.find(task => task._id === taskId);
  const selectedProject =
    selectedTask &&
    projects.find(project => project._id === selectedTask.project);

  const taskURL = `/projects/${
    selectedProject && selectedProject._id
  }/tasks/${taskId}`;

  const projectURL = `/projects/${selectedProject && selectedProject._id}`;

  return selectedTask ? (
    <TaskBody column={selectedTask.column} page={page}>
      <Link to={taskURL}>
        <TaskDetailWrapper>
          <TaskTitle>{selectedTask.title}</TaskTitle>
          <TaskDetail>
            {moment(selectedTask.date).format("dddd, MMM Do, 'YY.")}
          </TaskDetail>
        </TaskDetailWrapper>
        <TaskDetailWrapper>
          <TaskDetail>{selectedTask.pl}</TaskDetail>
          <TaskDetail>
            Due: {moment(selectedTask.dueDate).format("dddd, MMM Do, 'YY.")}
          </TaskDetail>
        </TaskDetailWrapper>
        <TaskDescription>{selectedTask.description}</TaskDescription>
      </Link>
      <TaskDetailWrapper>
        <TaskIcon>
          <TaskProjectLink>
            {selectedTask.done ? <FaCheck /> : <FaBan />}
            <FaProjectDiagram />
            <Link to={projectURL}>
              {selectedProject && selectedProject.title}
            </Link>
          </TaskProjectLink>
        </TaskIcon>
        <TaskIcon>
          <FaStickyNote />
          {selectedTask.notesCount || 0}
          <FaRegClock />
          {selectedTask.eventsCount || 0}
        </TaskIcon>
      </TaskDetailWrapper>
    </TaskBody>
  ) : null;
};

export default TaskListItem;
