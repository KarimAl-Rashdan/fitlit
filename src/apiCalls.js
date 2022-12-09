// Your fetch requests will live here!


const getAPIData = (url) => {
  return fetch(url)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log("error", err));
};
// Promise.all([getAllData("users"), getAllData("hydration"), getAllData("sleep")])
// .then(data => console.log(data));

export default getAPIData;
