import React, { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { FaPaperPlane } from "react-icons/fa";

import {
  Background,
  NPPlaceholder,
  NPForm,
  NPInput,
  NPSubmitButton,
  NPWarning
} from "./NewProject.styles";

import { submitProjectCall } from "../../lib/drivers/Project/project.driver";
import { url } from "../../constants/regex";

const NewProject = ({ setNewProject }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pl, setPl] = useState("");
  const [kanboard, setKanboard] = useState("");
  const [dev, setDev] = useState("");
  const [stage, setStage] = useState("");
  const [prod, setProd] = useState("");
  const [live, setLive] = useState("");
  const [nas, setNas] = useState("");
  const [loading, setLoading] = useState(false);
  // Error while creating new project
  const [projectError, setProjectError] = useState(false);

  const { projects } = useStoreState(state => state);
  const { setProjects } = useStoreActions(actions => actions);

  const newProjectFoo = async e => {
    e.preventDefault();

    setProjectError(false);
    setLoading(true);

    if (
      title.length <= 0 ||
      (kanboard && !url.test(kanboard)) ||
      (dev && !url.test(dev)) ||
      (stage && !url.test(stage)) ||
      (prod && !url.test(prod)) ||
      (live && !url.test(live))
    ) {
      setProjectError(true);
      setLoading(false);
      return null;
    }

    const payload = {
      title,
      description,
      pl,
      kanboard,
      dev,
      stage,
      prod,
      live,
      nas
    };

    const result = await submitProjectCall(payload);
    // If there are errors with creating a new project, display error msg
    if (result.error) {
      setProjectError(true);
      setLoading(false);
    }

    // After successfull project creation, add project to state
    if (result.project) {
      setProjects([...projects, result.project]);
      setLoading(false);
      setNewProject(false);
    }
  };

  return (
    <Background
      className="background"
      onClick={e =>
        e.target.classList.value.includes("background") && setNewProject(false)
      }
    >
      <NPPlaceholder>
        <NPForm>
          <NPInput
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          {projectError && (
            <NPWarning>You either missed the title or...</NPWarning>
          )}

          <NPInput
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <NPInput
            type="text"
            placeholder="Program Lead"
            value={pl}
            onChange={e => setPl(e.target.value)}
          />

          <NPInput
            type="url"
            placeholder="Kanboard"
            value={kanboard}
            onChange={e => setKanboard(e.target.value)}
          />
          {projectError && (
            <NPWarning>...or misspelled one of these links.</NPWarning>
          )}

          <NPInput
            type="url"
            placeholder="Development"
            value={dev}
            onChange={e => setDev(e.target.value)}
          />
          {projectError && (
            <NPWarning>...or misspelled one of these links.</NPWarning>
          )}

          <NPInput
            type="url"
            placeholder="Staging"
            value={stage}
            onChange={e => setStage(e.target.value)}
          />
          {projectError && (
            <NPWarning>...or misspelled one of these links.</NPWarning>
          )}

          <NPInput
            type="url"
            placeholder="Production"
            value={prod}
            onChange={e => setProd(e.target.value)}
          />
          {projectError && (
            <NPWarning>...or misspelled one of these links.</NPWarning>
          )}

          <NPInput
            type="url"
            placeholder="Live"
            value={live}
            onChange={e => setLive(e.target.value)}
          />
          {projectError && (
            <NPWarning>...or misspelled one of these links.</NPWarning>
          )}

          <NPInput
            type="text"
            placeholder="NAS"
            value={nas}
            onChange={e => setNas(e.target.value)}
          />
          {projectError && (
            <NPWarning>An error occurred, please try again.</NPWarning>
          )}

          {loading && (
            <NPWarning loading={loading ? loading.toString() : undefined}>
              Loading...
            </NPWarning>
          )}

          <NPSubmitButton title={title ? title.toString() : undefined}>
            <FaPaperPlane onClick={e => newProjectFoo(e)} />
          </NPSubmitButton>
        </NPForm>
      </NPPlaceholder>
    </Background>
  );
};

export default NewProject;
