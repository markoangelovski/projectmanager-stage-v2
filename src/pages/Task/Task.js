import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { FaInfo, FaStickyNote, FaRegClock, FaCode } from "react-icons/fa";

import { TaskWrapper, TaskMenu, TaskMenuItem, TaskSource } from "./Task.styles";

import TaskDetailsItem from "../../components/TaskDetailsItem/TaskDetailsItem";
import TaskNotesItem from "../../components/TaskNotesItem/TaskNotesItem";
import Event from "../../components/Event/Event";

const Task = props => {
  const { tasks, singleTaskNotes, singleTaskEvents } = useStoreState(
    state => state
  );
  const {
    getSingleTaskNotes,
    setSingleTaskNotes,
    getSingleTaskEvents,
    setSingleTaskEvents
  } = useStoreActions(actions => actions);

  // Menu display state
  const [info, setInfo] = useState(false);
  const [notesMenu, setNotesMenu] = useState(false);
  const [eventsMenu, setEventsMenu] = useState(false);
  const [json, setJson] = useState(false);

  // Notes and Events refetch control
  const [fetchedNotes, setFetchedNotes] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState(false);

  const selectedTaskData = tasks.find(
    task => task._id === props.match.params.taskId
  );
  console.log(
    "<Task>",
    selectedTaskData && selectedTaskData.title,
    selectedTaskData && selectedTaskData._id
  );

  const fetchTaskEvents = () => {
    // Fetch Task Events
    !eventsMenu &&
      selectedTaskData &&
      selectedTaskData.eventsCount &&
      !fetchedEvents &&
      getSingleTaskEvents(selectedTaskData._id);
    setFetchedEvents(true);
  };

  const fetchTaskNotes = () => {
    // Fetch Task Notes
    !notesMenu &&
      selectedTaskData &&
      selectedTaskData.notesCount &&
      !fetchedNotes &&
      getSingleTaskNotes(selectedTaskData._id);
    setFetchedNotes(true);
  };

  useEffect(() => {
    if (!localStorage.taskMenu) localStorage.taskMenu = "info";
    if (localStorage.taskMenu === "info") {
      setInfo(true);
    } else if (localStorage.taskMenu === "notes") {
      setNotesMenu(true);
    } else if (localStorage.taskMenu === "events") {
      setEventsMenu(true);
    } else if (localStorage.taskMenu === "json") {
      setJson(true);
    }

    // Fetch Notes or Events on initial page load if one of them is selected
    !eventsMenu &&
      localStorage.taskMenu === "events" &&
      selectedTaskData &&
      selectedTaskData.eventsCount &&
      !fetchedEvents &&
      fetchTaskEvents();
    !notesMenu &&
      localStorage.taskMenu === "notes" &&
      selectedTaskData &&
      selectedTaskData.notesCount &&
      !fetchedNotes &&
      fetchTaskNotes();

    // Clear Notes and Events of the single task from store
    return () => {
      !fetchedNotes && setSingleTaskNotes([]);
      !fetchedEvents && setSingleTaskEvents([]);
    };
    // eslint-disable-next-line
  }, [eventsMenu, notesMenu, selectedTaskData]);

  const selectMenu = e => {
    const type = e.target.dataset.type || e.target.parentNode.dataset.type;
    if (type === "info") {
      localStorage.taskMenu = "info";
      setInfo(true);
      setNotesMenu(false);
      setEventsMenu(false);
      setJson(false);
    } else if (type === "notes") {
      localStorage.taskMenu = "notes";
      setInfo(false);
      setNotesMenu(true);
      setEventsMenu(false);
      setJson(false);
    } else if (type === "events") {
      localStorage.taskMenu = "events";
      setInfo(false);
      setNotesMenu(false);
      setEventsMenu(true);
      setJson(false);
    } else if (type === "json") {
      localStorage.taskMenu = "json";
      setInfo(false);
      setNotesMenu(false);
      setEventsMenu(false);
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
            eventsMenu={eventsMenu}
            json={json}
          >
            <TaskMenuItem data-type="info" onClick={e => selectMenu(e)}>
              <FaInfo data-type="info" />
            </TaskMenuItem>
            <TaskMenuItem
              data-type="notes"
              onClick={e => {
                selectMenu(e);
                fetchTaskNotes();
              }}
            >
              <FaStickyNote data-type="notes" />
            </TaskMenuItem>
            <TaskMenuItem
              data-type="events"
              onClick={e => {
                selectMenu(e);
                fetchTaskEvents();
              }}
            >
              <FaRegClock data-type="events" />
            </TaskMenuItem>
            <TaskMenuItem data-type="json" onClick={e => selectMenu(e)}>
              <FaCode data-type="json" />
            </TaskMenuItem>
          </TaskMenu>
          {info && <TaskDetailsItem task={selectedTaskData} />}
          {notesMenu &&
            singleTaskNotes
              .map(note => <TaskNotesItem key={note._id} note={note} />)
              .reverse()}
          {eventsMenu &&
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
