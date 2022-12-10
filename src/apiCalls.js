// Your fetch requests will live here!

const getAPIData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log("error", err));
};



export default getAPIData;



