const {
  "pmspa-api": { api, apiVersion }
} = require(`../../../config/${process.env.REACT_APP_API_CONFIG}`);

const getSingleProjectCall = projectId => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/projects/${projectId}`, {
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const getProjectsCall = (skip = 0) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/projects?skip=${skip}`, {
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const submitProjectCall = payload => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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

const editProjectCall = (linkId, payload) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/links/${linkId}/?link=${payload}`, {
      method: "PATCH",
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const deleteProjectCall = (taskId, linkId) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/links/${taskId}?linkId=${linkId}`, {
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
  getSingleProjectCall,
  getProjectsCall,
  submitProjectCall,
  editProjectCall,
  deleteProjectCall
};
