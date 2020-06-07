import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import {
  FaInfo,
  FaStickyNote,
  FaLink,
  FaRegClock,
  FaCode
} from "react-icons/fa";

import { TaskWrapper, TaskMenu, TaskMenuItem, TaskSource } from "./Task.styles";

import TaskDetailsItem from "../../components/TaskDetailsItem/TaskDetailsItem";
import TaskNotesItem from "../../components/TaskNotesItem/TaskNotesItem";
import TaskLinksItem from "../../components/TaskLinksItem/TaskLinksItem";
import Event from "../../components/Event/Event";

const Task = props => {
  const { tasks, notes, singleTaskEvents } = useStoreState(state => state);
  const { getNotes, getSingleTaskEvents } = useStoreActions(actions => actions);

  // Menu display state
  const [info, setInfo] = useState(false);
  const [notesMenu, setNotesMenu] = useState(false);
  const [links, setLinks] = useState(false);
  const [events, setEvents] = useState(false);
  const [json, setJson] = useState(false);

  const selectedTaskData = tasks.find(
    task => props.match.params.taskId === task._id
  );

  console.log("<Task>", selectedTaskData);

  useEffect(() => {
    // Fetch Task Events
    events && selectedTaskData && getSingleTaskEvents(selectedTaskData._id);

    // Fetch Task Notes
    notesMenu &&
      selectedTaskData &&
      selectedTaskData.notes.length &&
      !notes.length &&
      getNotes();

    if (!localStorage.taskMenu) localStorage.taskMenu = "info";
    if (localStorage.taskMenu === "info") {
      setInfo(true);
    } else if (localStorage.taskMenu === "notes") {
      setNotesMenu(true);
    } else if (localStorage.taskMenu === "links") {
      setLinks(true);
    } else if (localStorage.taskMenu === "events") {
      setEvents(true);
    } else if (localStorage.taskMenu === "json") {
      setJson(true);
    }
    // eslint-disable-next-line
  }, [events, notesMenu, selectedTaskData]);

  const selectMenu = e => {
    const type = e.target.dataset.type || e.target.parentNode.dataset.type;
    if (type === "info") {
      localStorage.taskMenu = "info";
      setInfo(true);
      setNotesMenu(false);
      setLinks(false);
      setEvents(false);
      setJson(false);
    } else if (type === "notes") {
      localStorage.taskMenu = "notes";
      setInfo(false);
      setNotesMenu(true);
      setLinks(false);
      setEvents(false);
      setJson(false);
    } else if (type === "links") {
      localStorage.taskMenu = "links";
      setInfo(false);
      setNotesMenu(false);
      setLinks(true);
      setEvents(false);
      setJson(false);
    } else if (type === "events") {
      localStorage.taskMenu = "events";
      setInfo(false);
      setNotesMenu(false);
      setLinks(false);
      setEvents(true);
      setJson(false);
    } else if (type === "json") {
      localStorage.taskMenu = "json";
      setInfo(false);
      setNotesMenu(false);
      setLinks(false);
      setEvents(false);
      setJson(true);
    }
  };

  return (
    <>
      {selectedTaskData ? (
        <TaskWrapper>
          <TaskMenu
            info={info}
            notesMenu={notesMenu}
            links={links}
            events={events}
            json={json}
          >
            <TaskMenuItem data-type="info" onClick={e => selectMenu(e)}>
              <FaInfo data-type="info" />
            </TaskMenuItem>
            <TaskMenuItem data-type="notes" onClick={e => selectMenu(e)}>
              <FaStickyNote data-type="notes" />
            </TaskMenuItem>
            <TaskMenuItem data-type="links" onClick={e => selectMenu(e)}>
              <FaLink data-type="links" />
            </TaskMenuItem>
            <TaskMenuItem data-type="events" onClick={e => selectMenu(e)}>
              <FaRegClock data-type="events" />
            </TaskMenuItem>
            <TaskMenuItem data-type="json" onClick={e => selectMenu(e)}>
              <FaCode data-type="json" />
            </TaskMenuItem>
          </TaskMenu>
          {info && <TaskDetailsItem task={selectedTaskData} />}
          {notesMenu &&
            selectedTaskData.notes
              .map(note => <TaskNotesItem key={note} noteId={note} />)
              .reverse()}
          {links &&
            selectedTaskData.links.map(link => (
              <TaskLinksItem key={link._id} link={link} />
            ))}
          {events &&
            singleTaskEvents.map(event => (
              <Event key={event._id} event={event} />
            ))}
          {json && (
            <TaskSource>
              <code>{JSON.stringify(selectedTaskData, null, 5)}</code>
            </TaskSource>
          )}
        </TaskWrapper>
      ) : (
        <div>Task not found.</div>
      )}
    </>
  );
};

export default Task;
