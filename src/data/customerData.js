const _apiUrlC = "/api/customers";



export const getCustomers = () => {
  return fetch(_apiUrlC).then((r) => r.json());
};

export const getSingleCustomer = (id) => new Promise((resolve, reject) => {
  fetch(`${_apiUrlC}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
