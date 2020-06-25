const {
  "pmspa-api": { api, apiVersion }
} = require(`../../../config/${process.env.REACT_APP_API_CONFIG}`);

const getNotesCall = () => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/notes`, {
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const submitNoteCall = (task, payload) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/notes/${task}`, {
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

const editNoteCall = (noteId, payload) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/notes/${noteId}?note=${payload}`, {
      method: "PATCH",
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const deleteNoteCall = (taskId, noteId) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/notes/${taskId}?noteId=${noteId}`, {
      method: "DELETE",
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

export { getNotesCall, submitNoteCall, editNoteCall, deleteNoteCall };
