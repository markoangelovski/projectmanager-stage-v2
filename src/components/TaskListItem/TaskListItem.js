import React from "react";
import { Link } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import moment from "moment";
import { FaStickyNote, FaLink, FaRegClock } from "react-icons/fa";

import {
  TaskBody,
  TaskDetailWrapper,
  TaskTitle,
  TaskDetail,
  TaskDescription,
  TaskIcon
} from "./TaskListItem.styles";

const TaskListItem = ({ projectId, taskId }) => {
  const { tasks } = useStoreState(state => state);

  const selectedTask = tasks.find(task => task._id === taskId);

  return selectedTask ? (
    <TaskBody>
      <Link to={`/projects/${projectId}/tasks/${taskId}`}>
        <TaskDetailWrapper>
          <TaskTitle>{selectedTask.title}</TaskTitle>
          <TaskDetail>
            {moment(selectedTask.date).format("dddd, MMM Do, 'YY.")}
          </TaskDetail>
        </TaskDetailWrapper>
        <TaskDescription>
          <TaskDetail>
            Due: {moment(selectedTask.dueDate).format("dddd, MMM Do, 'YY.")}
          </TaskDetail>
          {selectedTask.description}
        </TaskDescription>
        <TaskDetailWrapper>
          <TaskDetail>{selectedTask.pl}</TaskDetail>
          <TaskIcon>
            <FaStickyNote />
            {selectedTask.notes.length}
            <FaLink />
            {selectedTask.links.length}
            <FaRegClock />
            {selectedTask.events.length}
          </TaskIcon>
        </TaskDetailWrapper>
      </Link>
    </TaskBody>
  ) : null;
};

export default TaskListItem;
