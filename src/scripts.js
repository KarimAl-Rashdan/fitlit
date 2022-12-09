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
import Hydration from "./Hydration";
import HydrationRepository from "./Hydration-Repository";
import Sleep from "./Sleep-Class";
import SleepRepository from "./SleepRepository";
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
let hydrationRepository;
let dateForWeek;

const welcomeContainer = document.getElementById("user-info");
const stepsWidget = document.getElementById("steps-widget");
const stepsButton = document.getElementById("steps");
const userFriendsSection = document.getElementById("friends-info");
const returnStepsWidgetButton = document.getElementById("return-to-widget");
const sleepWidgetButton = document.getElementById("sleep");
const sleepWidget = document.getElementById("sleep-widget");

/*------------EVENT LISTENER----------*/
window.addEventListener("load", () => {
  allUserData = getAPIData(userAPI);
  getRandomUser(allUserData);
});
stepsButton.addEventListener("click", updateStepWidget);
returnStepsWidgetButton.addEventListener("click", (event) => {
  returnToStepsWidget(event);
});
sleepWidgetButton.addEventListener("click", () => {
  updateSleepData();
});

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
  getRandomUser(allUserData);
  allSleepData = dataSet2.map((data) => new Sleep(data));
  sleepRepository = new SleepRepository(allSleepData);
  allHydroData = dataSet3.map((data) => new Hydration(data));
  hydrationRepository = new HydrationRepository(allHydroData);
}

function getRandomUser(allUserData) {
  const randomID = Math.floor(Math.random() * allUserData.length);
  currentUser = allUserData[randomID];
  currentUserID = allUserData[randomID].id;
  updateUserInfo();
  updateFriendsInfo();
  return currentUserID;
}

function updateUserInfo() {
  welcomeContainer.innerHTML = `
  <h1 class="user-name">Welcome, ${currentUser.firstName()}!</h1>
  <h2 class="user-info">${currentUser.address}, ${currentUser.email}</h2>`;
}

function updateFriendsInfo() {
  allUserData[currentUserID].friends.forEach((friend) => {
    userFriendsSection.innerHTML += `<div     class="user-friends" id="friend">
      <h2>${userRepository.findUser(friend).name}</h2><br>
      <h3>Step Goal: ${userRepository.findUser(friend).dailyStepGoal}</h3>
    </div>`;
  });
}

function updateStepWidget() {
  stepsButton.classList.add("hidden");
  stepsWidget.classList.remove("hidden");
  returnStepsWidgetButton.classList.remove("hidden");
  stepsWidget.innerHTML = `<ul> 
      <li>Stride Length: ${currentUser.strideLength}</li>
      <li>Your Daily Step Goal: ${
        currentUser.dailyStepGoal
      } Steps<br>Average Step Goal for All Users: ${userRepository.calculateAverageStepGoal()} Steps</li>
    </ul>`;
}

function returnToStepsWidget(event) {
  event.preventDefault();
  stepsWidget.classList.add("hidden");
  stepsButton.classList.remove("hidden");
  returnStepsWidgetButton.classList.add("hidden");
}

function updateSleepData() {
  sleepWidgetButton.classList.add("hidden");
  sleepWidget.classList.remove("hidden");
  console.log("hours slept and sleep quality for current user", sleepRepository.filterSleepByUser(currentUserID))
  sleepWidget.innerHTML = `
  <ul>
            <li>Hours Slept Today: ${sleepRepository.findTodaysData(currentUserID).hoursSlept}</li>
            <li>Sleep Quality for Today: ${sleepRepository.findTodaysData(currentUserID).sleepQuality}</li>
            <li>Hours Slept for the Week: ${findLatestWeeksSleepData(currentUserID, 'hoursSlept')}</li>
            <li>Sleep Quality for the Week: ${findLatestWeeksSleepData(currentUserID, 'sleepQuality')}</li>
            <li>all time avg(quality, hours)</li>
          </ul>
          `
}

function findLatestWeeksSleepData(id, type) {
  dateForWeek = sleepRepository.findTodaysData(id).date
  let dataForWeek = sleepRepository.calculateSleepPerWeek(dateForWeek, id)
  let dataResult = dataForWeek.reduce((acc, cur, index) => {
    acc.push(` day ${index + 1}: ${cur[type]} `)
    return acc 
  }, [])
  return dataResult
}
