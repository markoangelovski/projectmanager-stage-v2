import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

const Projects = props => {
  const { projects, fetching } = useStoreState(state => state);
  console.log("<Projects>", projects);

  const getProjects = useStoreActions(actions => actions.getProjects);

  useEffect(() => {
    if (projects.length === 0) getProjects();
    // eslint-disable-next-line
  }, []);

  if (fetching) return <div>Loading projects...</div>;

  return (
    <>
      <div>Total Projects: {projects.length}</div>
      {projects.map(project => {
        return (
          <div key={project._id} style={{ margin: "10px" }}>
            <div>
              Title: {project.title}{" "}
              <img
                src={project.owner.avatar_url}
                alt={project.owner._id}
                style={{
                  width: "25px",
                  borderRadius: "50px",
                  display: "inline"
                }}
              ></img>
            </div>
            <Link to={`/projects/${project._id}`}>View Project details ></Link>
          </div>
        );
      })}
    </>
  );
};

export default Projects;
