import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

const Project = props => {
  const { projects, fetching } = useStoreState(state => state);

  const getProjects = useStoreActions(actions => actions.getProjects);

  const selectedProject = projects.find(
    project => props.match.params.projectId === project._id
  );
  console.log("<Project>", selectedProject);

  useEffect(() => {
    if (projects.length === 0) getProjects();
    // eslint-disable-next-line
  }, []);

  if (fetching) return <div>Loading project...</div>;

  return (
    <>
      {selectedProject ? (
        <>
          <div>Project: {selectedProject.title}</div>
          <div>
            Tasks:{" "}
            <ul>
              {selectedProject.tasks.map(task => (
                <li key={task._id}>
                  {task.title}{" "}
                  <Link
                    to={`/projects/${props.match.params.projectId}/tasks/${task._id}`}
                  >
                    View Task Details >
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div>Project not found.</div>
      )}
    </>
  );
};

export default Project;
