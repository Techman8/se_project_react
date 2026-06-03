const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

export const getItems = () => request(`${baseUrl}/items`, { headers });

export const addCard = ({ name, imageUrl, weather }) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

export const removeItem = (itemID) => {
  return request(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers,
  });
};
