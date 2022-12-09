// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// console.log(userData,"<>>>>userData")
// An example of how you tell webpack to use a CSS file
import "../src/css/styles.css";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "../src/images/turing-logo.png";

console.log("This is the JavaScript entry file - your code begins here.");

// An example of how you tell webpack to use a JS file

import userData from "./data/users";
import UserRepository from "./UserRepository";
import getAPIData from "./apiCalls";
import User from "./User-Class";
import Hydration from "./Hydration"
import HydrationRepository from "./Hydration-Repository"
import Sleep from "./Sleep-Class"
import SleepRepository from "./SleepRepository"
// import { sharing } from 'webpack';

const userAPI = "https://fitlit-api.herokuapp.com/api/v1/users";
const sleepAPI = "https://fitlit-api.herokuapp.com/api/v1/sleep";
const hydrationAPI = "https://fitlit-api.herokuapp.com/api/v1/hydration";

let allUserData;
let allSleepData;
let allHydroData;
let userRepository;
let currentUser;
let currentUserID;
let sleepRepository;
let hydrationRepository

// window.addEventListener("load", () => {
//   allUserData = getAPIData(userAPI);
// });

Promise.all([
  getAPIData(userAPI),
  getAPIData(sleepAPI),
  getAPIData(hydrationAPI),
])
  .then((response) => {
    allUserData = response[0].userData;
    allSleepData = response[1].sleepData;
    allHydroData = response[2].hydrationData;
    createClassInstances(allUserData, allSleepData, allHydroData);
  })
  .catch((error) => {
    console.log(error);
  });

function createClassInstances(dataSet1, dataSet2, dataSet3) {
  allUserData = dataSet1.map((user) => new User(user));
  userRepository = new UserRepository(allUserData);
  console.log(userRepository);
  getRandomUser(allUserData);
  allSleepData = dataSet2.map(data => new Sleep(data));
  sleepRepository = new SleepRepository(allSleepData);
  console.log("LABEL FOR SLEEP", sleepRepository);
  allHydroData = dataSet3.map(data => new Hydration(data));
  hydrationRepository = new HydrationRepository(allHydroData);
}

function getRandomUser(allUserData) {
  const randomID = Math.floor(Math.random() * allUserData.length);
  currentUser = allUserData[randomID];
  console.log("CURRENTUSER", currentUser)
  currentUserID = allUserData[randomID].id;
  console.log("CURRENTID", currentUserID)
  getFriends(currentUser);
  return currentUserID;
}

function getFriends(user) {
    console.log("LABEL", allUserData)
    console.log("USER", user)
    const myFriends = user.friends;
    
}