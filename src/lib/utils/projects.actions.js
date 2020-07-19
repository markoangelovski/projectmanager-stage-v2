import {
  getSingleProjectCall,
  getProjectsCall
} from "../drivers/Project/project.driver";

const getSingleProject = async (actions, projectId) => {
  actions.toggleFetching();
  try {
    const res = await getSingleProjectCall(projectId);
    if (!res.error) actions.setProjects([res.project]);
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const getProjects = async (actions, skip) => {
  actions.toggleFetching();
  try {
    const res = await getProjectsCall(skip);
    if (!res.error) {
      actions.setProjects(res.projects);
      actions.setHasMoreProjects(res.stats);
      actions.setProjectsSkip();
    }
    actions.toggleFetching();
  } catch (error) {
    actions.toggleFetching();
    console.warn(error);
  }
};

const setProjects = (state, projects) => {
  const arr1 = state.projects.map(project => [project._id, project]);
  const arr2 = projects.map(project => [project._id, project]);
  const obj = Object.fromEntries([...arr1, ...arr2]);
  state.projects = Object.values(obj);
};

const setHasMoreProjects = (state, stats) => {
  if (!stats.remaining) state.hasMoreProjects = false;
};

const setProjectsSkip = state => {
  state.projectsSkip += 10;
};

export {
  getSingleProject,
  getProjects,
  setProjects,
  setHasMoreProjects,
  setProjectsSkip
};
