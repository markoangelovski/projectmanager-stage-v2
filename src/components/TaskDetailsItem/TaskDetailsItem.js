import React, { useState } from "react";
import moment from "moment";
import {
  FaPencilAlt,
  FaBan,
  FaCheck,
  FaStickyNote,
  FaRegClock
} from "react-icons/fa";

import {
  TaskBody,
  TaskDetailWrapper,
  TaskTitle,
  TaskDetail,
  TaskDescription,
  TaskLink,
  TaskDetailCount
} from "./TaskDetailsItem.styles";

import EditTask from "../EditTask/EditTask";

const TaskListItem = ({ task }) => {
  const [edit, setEditTask] = useState(false);

  return (
    <>
      <TaskBody>
        <TaskDetailWrapper>
          <TaskTitle>{task.title}</TaskTitle>
          <TaskDetailWrapper>
            <TaskDetail>{moment(task.date).format("MMM Do, 'YY.")}</TaskDetail>
            <FaPencilAlt onClick={() => setEditTask(true)} />
          </TaskDetailWrapper>
        </TaskDetailWrapper>
        <TaskDetail>Program Lead:</TaskDetail>
        <TaskDescription>{task.pl}</TaskDescription>
        <TaskDetail>Description:</TaskDetail>
        <TaskDescription>{task.description}</TaskDescription>
        <TaskDetail>Due date:</TaskDetail>
        <TaskDescription>
          {moment(task.dueDate).format("MMM Do, 'YY.")}
        </TaskDescription>
        <TaskDetail>Column:</TaskDetail>
        <TaskDescription>{task.column}</TaskDescription>
        <TaskDetail>NAS:</TaskDetail>
        <TaskDescription>{task.nas}</TaskDescription>
        <TaskDetail>Kanboard:</TaskDetail>
        <TaskDescription>
          <TaskLink href={task.kanboard} target="_blank">
            {task.kanboard}
          </TaskLink>
        </TaskDescription>
        <TaskDetailCount>
          <TaskDetailWrapper>
            <div>
              {task.done ? <FaCheck /> : <FaBan />}
              <FaStickyNote />
              {task.notesCount || 0} <FaRegClock />
              {task.eventsCount || 0}
            </div>
          </TaskDetailWrapper>
        </TaskDetailCount>
      </TaskBody>
      {edit && <EditTask task={task} setEditTask={setEditTask} />}
    </>
  );
};

export default TaskListItem;
