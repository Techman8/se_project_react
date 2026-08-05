import  { baseUrl } from "../utils/constants";

const headers = {
  "Content-Type": "application/json",
};

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

// Public Endpoint: Runs on page load without token authentication
export const getItems = () => request(`${baseUrl}/items`, { headers });

// Protected Endpoint: Expects a token parameter from App.jsx
export const addCard = ({ name, imageUrl, weather }, token) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`, // Appends the authorization token securely
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

// Protected Endpoint: Expects a token parameter from App.jsx
export const removeItem = (itemID, token) => {
  return request(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`, // Appends the authorization token securely
    },
  });
};

export const addCardLike = (itemID, token) => {
  return request(`${baseUrl}/items/${itemID}/likes`, {
    method: "PUT",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  });
};

export const removeCardLike = (itemID, token) => {
  return request(`${baseUrl}/items/${itemID}/likes`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  });
};
