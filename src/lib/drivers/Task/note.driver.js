const {
  pmBackend: { api, apiversion }
} = require(`../../../config/${process.env.API_CONFIG}`);

const submitNoteCall = (task, payload) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiversion}/notes/${task}`, {
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
    fetch(`${api}/${apiversion}/notes/${noteId}?note=${payload}`, {
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
    fetch(`${api}/${apiversion}/notes/${taskId}?noteId=${noteId}`, {
      method: "DELETE",
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

export { submitNoteCall, editNoteCall, deleteNoteCall };
