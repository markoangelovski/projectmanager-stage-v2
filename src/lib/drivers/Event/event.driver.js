const {
  pmBackend: { api, apiversion }
} = require(`../../../config/${process.env.REACT_APP_API_CONFIG}`);

const createEventCall = payload => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiversion}/days`, {
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

const getDaysCall = payload => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiversion}/days?${payload}`, {
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const getSingleDayCall = ({ start = "", id = "" }) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiversion}/days?start=${start}&id=${id}`, {
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
    fetch(`${api}/${apiversion}/days/${eventId}`, {
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
    fetch(`${api}/${apiversion}/days/${start}`, {
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
  createEventCall,
  getDaysCall,
  getSingleDayCall,
  updateEventCall,
  deleteEventCall
};
