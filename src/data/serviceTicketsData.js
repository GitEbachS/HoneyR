const _apiUrl = "/api/servicetickets";



export const getServiceTickets = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

export const getSingleTicket = (id) => new Promise((resolve, reject) => {
  fetch(`${_apiUrl}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
export const deleteTicket = (id) => new Promise((resolve, reject) => {
  fetch(`${_apiUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
export const updateTicket = (payload) => new Promise((resolve, reject) => {
  fetch(`${_apiUrl}/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
export const createTicket = (payload) => new Promise((resolve, reject) => {
  fetch(`${_apiUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
