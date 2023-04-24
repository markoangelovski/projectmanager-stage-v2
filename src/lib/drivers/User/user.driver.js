const {
  "pmspa-api": { api, apiVersion }
} = require(`../../../config/${process.env.REACT_APP_API_CONFIG}`);

const checkAuthCall = () => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/auth`, {
      method: "POST",
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(user => resolve(user))
      .catch(error => reject(error));
  });
};

const logInCall = payload => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // Credentials: include for setting the cookie in browser
      credentials: "include",
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(token => resolve(token))
      .catch(error => reject(error));
  });
};

const logOutCall = () => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/auth/logout`, {
      method: "GET",
      // Credentials: include for setting the cookie in browser
      credentials: "include"
    })
      .then(res => res.json())
      .then(token => resolve(token))
      .catch(error => reject(error));
  });
};

module.exports = { logInCall, logOutCall, checkAuthCall };
