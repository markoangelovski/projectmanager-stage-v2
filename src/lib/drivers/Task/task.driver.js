const {
  "pmspa-api": { api, apiVersion }
} = require(`../../../config/${process.env.REACT_APP_API_CONFIG}`);

const getSingleTaskCall = taskId => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/tasks?task=${taskId}`, {
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const getTasksByProjectCall = projectId => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/tasks?project=${projectId}`, {
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const getTasksCall = (skip = 0) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/tasks?skip=${skip}`, {
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const createTaskCall = payload => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload),
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const updateTaskCall = (taskId, payload) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload),
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const deleteTaskCall = taskId => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/tasks/${taskId}`, {
      method: "DELETE",
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

export {
  getSingleTaskCall,
  getTasksByProjectCall,
  getTasksCall,
  createTaskCall,
  updateTaskCall,
  deleteTaskCall
};
