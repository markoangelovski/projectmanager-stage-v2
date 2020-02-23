const {
  pmBackend: { api, apiversion }
} = require(`../../../config/${process.env.REACT_APP_API_CONFIG}`);

const bookEventCall = payload => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiversion}/booking`, {
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

export { bookEventCall };
