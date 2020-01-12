const {
  pmBackend: { api, apiversion }
} = require(`../../../config/${process.env.REACT_APP_API_CONFIG}`);

const getProjectsCall = () => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiversion}/projects`, {
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const submitProjectCall = (task, payload) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiversion}/links/${task}`, {
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
    fetch(`${api}/${apiversion}/links/${linkId}/?link=${payload}`, {
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
    fetch(`${api}/${apiversion}/links/${taskId}?linkId=${linkId}`, {
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
  getProjectsCall,
  submitProjectCall,
  editProjectCall,
  deleteProjectCall
};
