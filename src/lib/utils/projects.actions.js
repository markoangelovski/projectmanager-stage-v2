import { getProjectsCall } from "../drivers/Project/project.driver";

const getProjects = async actions => {
  actions.toggleFetching();
  try {
    const { projects } = await getProjectsCall();
    actions.setProjects(projects);
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const setProjects = (state, projects) => {
  state.projects = projects;
};

export { getProjects, setProjects };
