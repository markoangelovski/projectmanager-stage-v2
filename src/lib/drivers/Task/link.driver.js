const {
  pmBackend: { api, apiversion }
} = require(`../../../config/${process.env.API_CONFIG}`);

const submitLinkCall = (task, payload) => {
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

const editLinkCall = (linkId, payload) => {
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

const deleteLinkCall = (taskId, linkId) => {
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

export { submitLinkCall, editLinkCall, deleteLinkCall };
