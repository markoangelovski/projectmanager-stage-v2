const {
  "pmspa-api": { api, apiVersion }
} = require(`../../../config/${process.env.REACT_APP_API_CONFIG}`);

const createEventCall = payload => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/days/event.create`, {
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
    fetch(`${api}/${apiVersion}/days/event.find?${payload}`, {
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
    fetch(`${api}/${apiVersion}/days/event.find?start=${start}&id=${id}`, {
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const updateEventCall = (eventId, payload) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/days/event.update/${eventId}`, {
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

const deleteEventCall = (dayId, eventId) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/days/event.delete/${dayId}/${eventId}`, {
      method: "DELETE",
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const getSingleTaskEventsCall = task => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/days/event.find?task=${task}`, {
      // Credentials: include for sending the cookie from the browser to the backend
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const createLogCall = payload => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/days/log.create`, {
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

const updateLogCall = (logId, payload) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/days/log.update/${logId}`, {
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

const deleteLogCall = logId => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/${apiVersion}/days/log.delete/${logId}`, {
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
  deleteEventCall,
  getSingleTaskEventsCall,
  createLogCall,
  updateLogCall,
  deleteLogCall
};
