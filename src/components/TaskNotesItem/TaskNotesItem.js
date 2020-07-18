import React from "react";
import { Link } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import moment from "moment";
import { FaTasks } from "react-icons/fa";

import {
  NoteBody,
  NoteLink,
  NoteDetailWrapper,
  NoteDetail,
  NoteDescription,
  NoteIcon
} from "./TaskNotesItem.styles";

const TaskNotesItem = ({ note }) => {
  // eslint-disable-next-line
  const { tasks, fetching } = useStoreState(state => state);

  const selectedTask = tasks.find(task => task._id === note.task);

  // if (fetching) return <div>Loading notes...</div>;

  return note ? (
    <NoteBody>
      <NoteDetailWrapper>
        <NoteIcon>
          <FaTasks />
          <NoteLink>
            <Link to={`/projects/${selectedTask.project}/tasks/${note.task}`}>
              {selectedTask.title}
            </Link>
          </NoteLink>
        </NoteIcon>
        <NoteDetail>
          {moment(note.date).format("dddd, MMM Do, 'YY.")}
        </NoteDetail>
      </NoteDetailWrapper>
      <NoteDescription>{note.note}</NoteDescription>
    </NoteBody>
  ) : null;
};

export default TaskNotesItem;
