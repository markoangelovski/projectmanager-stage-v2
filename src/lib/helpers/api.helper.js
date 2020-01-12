const {
  pmBackend: { api, apiversion }
} = require(`../../config/${process.env.API_CONFIG}`);

const apiCall = async url => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiversion}/${url}`, {
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(error => reject(error));
  });
};

const apiCallPost = async (payload, url) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiversion}/${url}`, {
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
      .catch(error => reject(error));
  });
};

const apiCallDelete = async (id, url) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiversion}/${url}/${id}`, {
      method: "DELETE",
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(error => reject(error));
  });
};

export { apiCall, apiCallPost, apiCallDelete };
