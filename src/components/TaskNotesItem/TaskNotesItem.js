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

const TaskNotesItem = props => {
  const { tasks, notes, fetching } = useStoreState(state => state);

  const selectedNote = notes.find(note => note._id === props.noteId);

  const selectedTask =
    selectedNote && tasks.find(task => task._id === selectedNote.task);

  if (fetching) return <div>Loading notes...</div>;

  return selectedNote ? (
    <NoteBody>
      <NoteDetailWrapper>
        <NoteIcon>
          <FaTasks />
          <NoteLink>
            <Link
              to={`/projects/${selectedTask.project}/tasks/${selectedNote.task}`}
            >
              {selectedTask.title}
            </Link>
          </NoteLink>
        </NoteIcon>
        <NoteDetail>
          {moment(selectedNote.date).format("dddd, MMM Do, 'YY.")}
        </NoteDetail>
      </NoteDetailWrapper>
      <NoteDescription>{selectedNote.note}</NoteDescription>
    </NoteBody>
  ) : null;
};

export default TaskNotesItem;
