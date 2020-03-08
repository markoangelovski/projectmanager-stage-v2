import React, { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { FaPaperPlane } from "react-icons/fa";

import {
  Background,
  NTPlaceholder,
  NTForm,
  NTInput,
  NTSubmitButton,
  NTSelect,
  NTDate,
  NTWarning
} from "./NewTask.styles";

import { createTaskCall } from "../../lib/drivers/Task/task.driver";
import { url } from "../../constants/regex";

const NewTask = props => {
  const { setNewTask, project } = props;

  const { tasks, projects, dayEnd } = useStoreState(state => state);
  const { setTasks, setProjects } = useStoreActions(actions => actions);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pl, setPl] = useState(project.pl);
  const [kanboard, setKanboard] = useState("");
  const [nas, setNas] = useState("");
  const [column, setColumn] = useState("Upcoming");
  const [dueDate, setDueDate] = useState(dayEnd);
  const [loading, setLoading] = useState(false);
  // Error while creating new task
  const [validationError, setValidationError] = useState(false);
  const [taskError, setTaskError] = useState(false);

  const newTaskFoo = async e => {
    e.preventDefault();

    setTaskError(false);
    setLoading(true);

    if (title.length <= 0 || (kanboard && !url.test(kanboard))) {
      setValidationError(true);
      setLoading(false);
      return null;
    }

    const payload = {
      project: project._id,
      title,
      description,
      pl,
      kanboard,
      nas,
      column,
      dueDate
    };
    console.log("payload", payload);
    const result = await createTaskCall(payload);

    // If there are errors with creating a new task, display error msg
    if (result.error) {
      setTaskError(true);
      setLoading(false);
    }

    // After successfull task creation, add task to state
    if (result.task) {
      setTasks([...tasks, result.task]);

      // Update project in state
      project.tasks = [...project.tasks, result.task._id];
      const filteredProjects = projects.filter(
        projectItem => projectItem._id !== project._id
      );
      setProjects([...filteredProjects, project]);

      setLoading(false);
      setNewTask(false);
    }
  };

  return (
    <Background
      className="background"
      onClick={e =>
        e.target.classList.value.includes("background") && setNewTask(false)
      }
    >
      <NTPlaceholder>
        <NTForm>
          <NTInput
            type="text"
            placeholder="Project"
            value={project.title}
            disabled={true}
          />

          <NTInput
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          {validationError && (
            <NTWarning>You either missed the title or...</NTWarning>
          )}

          <NTInput
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <NTInput
            type="text"
            placeholder="Program Lead"
            value={pl}
            onChange={e => setPl(e.target.value)}
          />

          <NTInput
            type="url"
            placeholder="Kanboard"
            value={kanboard}
            onChange={e => setKanboard(e.target.value)}
          />
          {validationError && <NTWarning>...or misspelled the link.</NTWarning>}

          <NTInput
            type="text"
            placeholder="NAS"
            value={nas}
            onChange={e => setNas(e.target.value)}
          />
          {taskError && (
            <NTWarning>An error occurred, please try again.</NTWarning>
          )}

          <NTSelect onInput={e => setColumn(e.target.value)}>
            <option value="Upcoming">Upcoming</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </NTSelect>

          <NTDate>
            <label htmlFor="dueDate">Due date:</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            ></input>
          </NTDate>

          {loading && (
            <NTWarning loading={loading ? loading.toString() : undefined}>
              Loading...
            </NTWarning>
          )}

          <NTSubmitButton title={title ? title.toString() : undefined}>
            <FaPaperPlane onClick={e => newTaskFoo(e)} />
          </NTSubmitButton>
        </NTForm>
      </NTPlaceholder>
    </Background>
  );
};

export default NewTask;
