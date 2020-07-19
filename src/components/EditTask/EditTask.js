import React, { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { FaPaperPlane } from "react-icons/fa";
import moment from "moment";

import {
  Background,
  ETPlaceholder,
  ETForm,
  ETInput,
  ETSubmitButton,
  ETSelect,
  ETDone,
  ETDate,
  ETWarning
} from "./EditTask.styles";

import { updateTaskCall } from "../../lib/drivers/Task/task.driver";
import { url } from "../../constants/regex";

const EditTask = props => {
  const { task, setEditTask } = props;

  const { tasks } = useStoreState(state => state);
  const { setTasks, getSingleProject } = useStoreActions(actions => actions);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [pl, setPl] = useState(task.pl);
  const [kanboard, setKanboard] = useState(task.kanboard);
  const [nas, setNas] = useState(task.nas);
  const [column, setColumn] = useState(task.column);
  const [dueDate, setDueDate] = useState(
    moment(task.dueDate).format("yyyy-MM-DD")
  );
  const [done, setDone] = useState(task.done);
  const [loading, setLoading] = useState(false);
  // Error while editing task
  const [validationError, setValidationError] = useState(false);
  const [taskError, setTaskError] = useState(false);

  const editTaskFoo = async e => {
    e.preventDefault();

    setTaskError(false);
    setLoading(true);

    if (title.length === 0 || (kanboard && !url.test(kanboard))) {
      setValidationError(true);
      setLoading(false);
      return null;
    }

    let payload = [
      {
        propName: "title",
        propValue: title
      },
      {
        propName: "description",
        propValue: description
      },
      {
        propName: "pl",
        propValue: pl
      },
      {
        propName: "kanboard",
        propValue: kanboard
      },
      {
        propName: "nas",
        propValue: nas
      },
      {
        propName: "column",
        propValue: column
      },
      {
        propName: "dueDate",
        propValue: new Date(dueDate).getTime()
      },
      {
        propName: "done",
        propValue: String(done)
      }
    ];
    // Remove undefinded, null or empty values from payload
    payload = payload.filter(
      field => typeof field.propValue === "string" && field.propValue.length
    );

    console.log("payload", payload);
    const result = await updateTaskCall(task._id, payload);

    // If there are errors with editing the task, display error msg
    if (result.error) {
      setTaskError(true);
      setLoading(false);
    }

    // After successfull task update, update task in state
    if (result.task) {
      // Update task in state
      const filteredTasks = tasks.filter(taskItem => taskItem._id !== task._id);
      setTasks([...filteredTasks, result.task]);
      // Re-fetch the single project to get updated task count
      getSingleProject(task.project);

      setLoading(false);
      setEditTask(false);
    }
  };

  return (
    <Background
      className="background"
      onClick={e =>
        e.target.classList.value.includes("background") && setEditTask(false)
      }
    >
      <ETPlaceholder>
        <ETForm>
          <ETInput
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          {validationError && (
            <ETWarning>You either missed the title or...</ETWarning>
          )}

          <ETInput
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <ETInput
            type="text"
            placeholder="Program Lead"
            value={pl}
            onChange={e => setPl(e.target.value)}
          />

          <ETInput
            type="url"
            placeholder="Kanboard"
            value={kanboard}
            onChange={e => setKanboard(e.target.value)}
          />
          {validationError && <ETWarning>...or misspelled the link.</ETWarning>}

          <ETInput
            type="text"
            placeholder="NAS"
            value={nas}
            onChange={e => setNas(e.target.value)}
          />

          <ETSelect value={column} onChange={e => setColumn(e.target.value)}>
            <option value="Upcoming">Upcoming</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </ETSelect>

          <ETDone>
            <label htmlFor="completed">Mark as done:</label>
            <input
              id="completed"
              defaultChecked={done}
              type="checkbox"
              onChange={e => setDone(!done)}
            />
          </ETDone>

          <ETDate>
            <label htmlFor="dueDate">Due date:</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            ></input>
          </ETDate>

          {loading && (
            <ETWarning loading={loading ? loading.toString() : undefined}>
              Loading...
            </ETWarning>
          )}

          {taskError && (
            <ETWarning>An error occurred, please try again.</ETWarning>
          )}

          <ETSubmitButton title={title ? title.toString() : undefined}>
            <FaPaperPlane onClick={e => editTaskFoo(e)} />
          </ETSubmitButton>
        </ETForm>
      </ETPlaceholder>
    </Background>
  );
};

export default EditTask;
