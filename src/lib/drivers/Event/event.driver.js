const {
  pmBackend: { api, apiversion }
} = require(`../../../config/${process.env.REACT_APP_API_CONFIG}`);

const createEventCall = payload => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiversion}/events`, {
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

const getEventsCall = payload => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiversion}/events?${payload}`, {
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const updateEventCall = (eventId, attributeKey, attributeValue) => {
  const payload = [
    {
      propName: attributeKey,
      value: attributeValue
    }
  ];
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiversion}/events/${eventId}`, {
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

const deleteEventCall = start => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiversion}/events/${start}`, {
      method: "DELETE",
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

export { createEventCall, getEventsCall, updateEventCall, deleteEventCall };
