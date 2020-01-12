const getProject = id => {
  const projects = JSON.parse(localStorage.projects);
  if (!id) {
    return projects;
  } else {
    return projects.find(project => {
      return project._id == id;
    });
  }
};

const setProject = project => {
  localStorage.projects = JSON.stringify([...getProject(), project]);
  localStorage.projectCount = parseInt(localStorage.projectCount) + 1;

  return project;
};

const removeProject = projectId => {
  localStorage.projects = JSON.stringify(
    getProject().filter(project => project._id !== projectId)
  );
  localStorage.projectCount = parseInt(localStorage.projectCount) - 1;

  const tasks = JSON.parse(localStorage.tasks).filter(
    task => task.project._id !== projectId
  );
  localStorage.tasks = JSON.stringify(tasks);
  localStorage.taskCount = tasks.length;
};

const getTask = id => {
  const tasks = JSON.parse(localStorage.tasks);
  if (!id) {
    return tasks;
  } else {
    return tasks.find(task => {
      return task._id == id;
    });
  }
};

const setTask = (task, projectId) => {
  localStorage.taskCount = parseInt(localStorage.taskCount) + 1;
  localStorage.tasks = JSON.stringify([...getTask(), task]);

  const projectToUpdate = getProject(projectId);
  projectToUpdate.tasks = [...projectToUpdate.tasks, task];
  const filteredProjects = getProject().filter(
    project => project._id !== projectId
  );
  localStorage.projects = JSON.stringify([
    ...filteredProjects,
    projectToUpdate
  ]);
  return task;
};

const removeTask = (taskId, projectId) => {
  localStorage.taskCount = parseInt(localStorage.taskCount) - 1;
  const tasks = getTask().filter(task => task._id !== taskId);
  localStorage.tasks = JSON.stringify(tasks);

  const projectToUpdate = getProject(projectId);
  projectToUpdate.tasks = projectToUpdate.tasks.filter(
    task => task._id !== taskId
  );
  const filteredProjects = getProject().filter(
    project => project._id !== projectId
  );
  localStorage.projects = JSON.stringify([
    ...filteredProjects,
    projectToUpdate
  ]);
  return "Task removed.";
};

const setUpdatedTask = (task, projectId) => {
  const tasks = getTask();
  const filteredTasks = tasks.filter(oldTask => oldTask._id !== task._id);
  localStorage.tasks = JSON.stringify([...filteredTasks, task]);
  const updatedProject = getProject(projectId);
  updatedProject.tasks = updatedProject.tasks.filter(
    oldTask => oldTask._id !== task._id
  );
  updatedProject.tasks = [...updatedProject.tasks, task];
  const filteredProjects = getProject().filter(
    project => project._id !== projectId
  );
  localStorage.projects = JSON.stringify([...filteredProjects, updatedProject]);
  return "Task set";
};

export {
  getProject,
  setProject,
  removeProject,
  getTask,
  setTask,
  removeTask,
  setUpdatedTask
};
