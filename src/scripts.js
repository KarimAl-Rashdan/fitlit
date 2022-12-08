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
// import { sharing } from 'webpack';

const userAPI = "https://fitlit-api.herokuapp.com/api/v1/users";
const sleepAPI = "https://fitlit-api.herokuapp.com/api/v1/sleep";
const hydrationAPI = "https://fitlit-api.herokuapp.com/api/v1/hydration";

let allUserData;
let allSleepData;
let allHydroData;
let userRepository;

// window.addEventListener("load", () => {
//   allUserData = getAPIData(userAPI);
// });

Promise.all([
    getAPIData(userAPI),
    getAPIData(sleepAPI),
    getAPIData(hydrationAPI)
])
    .then((response) => {
        allUserData = response[0].userData;
        allSleepData = response[1].sleepData;
        allHydroData = response[2].hydrationData;
        createClassInstances(allUserData, allSleepData, allHydroData)
    })
    .catch((error) => {
        console.log(error)
    });

function createClassInstances(dataSet1, dataSet2, dataSet3) {
 allUserData = dataSet1.map(user => new User(user))
 console.log(allUserData[0]);
 userRepository = new UserRepository(allUserData);
 console.log(userRepository)
}