// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import "../src/css/styles.css";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "../src/images/turing-logo.png";
import './images/sleeping.png'
import "./images/water.png"
import "./images/exercise.png"
import "./images/friends.png"
import "./images/intro.jpg"

console.log("This is the JavaScript entry file - your code begins here.");

// An example of how you tell webpack to use a JS file

import UserRepository from "./UserRepository";
import getAPIData from "./apiCalls";
import User from "./User-Class";

import Hydration from "./Hydration";
import HydrationRepository from "./Hydration-Repository";
import Sleep from "./Sleep-Class.js";
import SleepRepository from "./SleepRepository";
// import dayjs from "dayjs";
import generateChart from "../src/data/usersChart";
const dayjs = require("dayjs");
import { Chart } from "chart.js/auto";
// import { sharing } from 'webpack';
// All Imports ^^

// Global Variables

let allUserData;
let allSleepData;
let allHydroData;
let userRepository;
let currentUser;
let currentUserID;
let sleepRepository;
let hydrationRepository;
let dateForWeek;

let date;

// API AREA

const userAPI = "https://fitlit-api.herokuapp.com/api/v1/users";
const sleepAPI = "https://fitlit-api.herokuapp.com/api/v1/sleep";
const hydrationAPI = "https://fitlit-api.herokuapp.com/api/v1/hydration";

function getPageData() {
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
      getRandomUser(allUserData);
      // generateChart();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Query Selectors
const hydrationBtn = document.querySelector("#hydration");
const hydrationDisplay = document.querySelector(".hydration-widget");
const toggleHomeBtn = document.querySelector(".back-home");
const ouncesDrankToday = document.getElementById("todaysOz");
const calendarSub = document.getElementById("dateInput");
const calendarDate = document.getElementById("dateSelected");
const hydrationWeeklyAvg = document.getElementById("weeklyAvg");
const hydroAllTimeAvgArea = document.getElementById("allTimeAvg");

const welcomeContainer = document.getElementById("user-info");
const stepsWidget = document.getElementById("steps-widget");
const stepsButton = document.getElementById("steps");
const userFriendsSection = document.getElementById("friends-info");
const returnStepsWidgetButton = document.getElementById("return-to-widget");
const sleepWidgetButton = document.getElementById("sleep");
const sleepWidget = document.getElementById("sleep-widget");
const returnSleepWidgetButton = document.getElementById(
  "return-to-sleep-widget"
);
const sleepHoursChart = document.getElementById("sleep-hours-data");
const sleepQualityChart = document.getElementById("sleep-quality-data");

// addEventListener
hydrationBtn.addEventListener("click", () => {
  showHydrationArea();
  displayHydrationDom();
});
toggleHomeBtn.addEventListener("click", homeWidget);
window.addEventListener("load", getPageData);

stepsButton.addEventListener("click", updateStepWidget);
returnStepsWidgetButton.addEventListener("click", (event) => {
  returnToStepsWidget(event);
});
sleepWidgetButton.addEventListener("click", updateSleepData);

returnSleepWidgetButton.addEventListener("click", returnToSleepWidget);

calendarSub.addEventListener("click", displayWeeklyAverage);

// Functions

function createClassInstances(dataSet1, dataSet2, dataSet3) {
  allUserData = dataSet1.map((user) => new User(user));
  userRepository = new UserRepository(allUserData);
  // getRandomUser(allUserData);
  allSleepData = dataSet2.map((data) => new Sleep(data));
  sleepRepository = new SleepRepository(allSleepData);

  allHydroData = dataSet3.map((data) => new Hydration(data));
  hydrationRepository = new HydrationRepository(allHydroData);
  // displayHydrationDom();
  // displayHydrationDom(hydrationRepository, getRandomUser(allUserData));
}

function getRandomUser(allUserData) {
  const randomID = Math.floor(Math.random() * allUserData.length);
  currentUser = allUserData[randomID];
  console.log("HEY THIS IS CURRENT USER", currentUser);
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
    console.log("current user friends", currentUser.friends);
    console.log("friend", friend);
    userFriendsSection.innerHTML += `<div class="user-friends" id="friend">
      <h2>${userRepository.findUser(friend).name}</h2><br>
      <h3>Step Goal: ${userRepository.findUser(friend).dailyStepGoal}</h3>
    </div>`;
  });
}

//  Hydration Area
function showHydrationArea() {
  showArea(hydrationBtn, toggleHomeBtn, hydrationDisplay);
}
function homeWidget() {
  hideArea(hydrationBtn, toggleHomeBtn, hydrationDisplay);
}

function displayHydrationDom() {
  displayTodaysHydration(hydrationRepository, currentUserID);
  displayAverageConsumed();
}

function displayTodaysHydration(hydrationRepository, currentUserID) {
  const todaysOz = hydrationRepository.findTodaysHydration(currentUserID);
  ouncesDrankToday.innerText = `Today's you drank ${todaysOz} oz! `;
}

function displayWeeklyAverage(e) {
  e.preventDefault();
  const chosenDate = calendarDate.value;
  const alteredDate = chosenDate.replaceAll("-", "/");
  const userWeeklyData = hydrationRepository.findWeeklyHydration(
    alteredDate,
    currentUserID
  );
  userWeeklyData.forEach((recordedDay) => {
    hydrationWeeklyAvg.innerHTML += `<p class="hydration-weekly">
		  ${dayjs(recordedDay.date).format("dd/MMM/D/YYYY")} you consumed ${
      recordedDay.numOunces
    } ounces
		</p>`;
  });
}

function displayAverageConsumed() {
  const averageWaterAllTime =
    hydrationRepository.getAverageHydration(currentUserID);
  const roundedAverage = Math.trunc(averageWaterAllTime);
  hydroAllTimeAvgArea.innerText = `All time Average daily drink consumption is ${roundedAverage} oz !`;
}

function updateStepWidget() {
  stepsButton.classList.add("hidden");
  stepsWidget.classList.remove("hidden");
  returnStepsWidgetButton.classList.remove("hidden");
  stepsWidget.innerHTML = `<ul class=widget> 
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

// helperFunctions
function showArea(area1, area2, area3) {
  area1.classList.add("hidden");
  area2.classList.remove("hidden");
  area3.classList.remove("hidden");
}

function hideArea(area1, area2, area3) {
  area1.classList.remove("hidden");
  area2.classList.add("hidden");
  area3.classList.add("hidden");
}

function updateSleepData() {
  sleepWidgetButton.classList.add("hidden");
  sleepWidget.classList.remove("hidden");
  returnSleepWidgetButton.classList.remove("hidden");
  sleepWidget.innerHTML = `
          <ul class=widget>
            <li>Hours Slept Today: ${
              sleepRepository.findTodaysData(currentUserID).hoursSlept
            }</li>
            <li>Sleep Quality for Today: ${
              sleepRepository.findTodaysData(currentUserID).sleepQuality
            }</li>
            <li>Hours Slept for the Week: ${findLatestWeeksSleepData(
              currentUserID,
              "hoursSlept"
            )}</li>
            <li>Sleep Quality for the Week: ${findLatestWeeksSleepData(
              currentUserID,
              "sleepQuality"
            )}</li>
            <li>Your All Time Hours Slept Average: ${displayAverageSleepDataForAllTime(
              "hoursSlept"
            )} hours</li>
            <li>Your All Time Sleep Quality Average: ${displayAverageSleepDataForAllTime(
              "sleepQuality"
            )}</li>
          </ul>
          `;
}

function findLatestWeeksSleepData(id, type) {
  dateForWeek = sleepRepository.findTodaysData(id).date;
  let dataForWeek = sleepRepository.calculateSleepPerWeek(dateForWeek, id);
  let dataResult = dataForWeek.reduce((acc, cur, index) => {
    acc.push(` day ${index + 1}: ${cur[type]} `);
    return acc;
  }, []);
  return dataResult;
}

function displayAverageSleepDataForAllTime(type) {
  return sleepRepository.calcAvgSleepStats(type);
}

function returnToSleepWidget(event) {
  event.preventDefault();
  sleepWidgetButton.classList.remove("hidden");
  sleepWidget.classList.add("hidden");
  returnSleepWidgetButton.classList.add("hidden");
}

// function displayWeeklySleepData() {
//   sleepWidget.innerHTML = `<canvas id="week-of-hours></canvas>`;
//   const ctx = document.getElementById("week-of-hours");
//   const hoursForWeekChart = new CharacterData(ctx, {
//     type: 'bar',
//     data: {
//       labels: ['Day1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
//       datasets: [
//         {
//           label: 'Hours Slept for the Latest Week',
//           data: findLatestWeeksSleepData(currentUserID, "hoursSlept"),
//           borderColor: "rgb(77, 18, 238)",
//           backgroundColor: "rgb(248, 246, 246)"
//       },
//         { label: 'Sleep Quality for the Latest Week',
//         data: findLatestWeeksSleepData(currentUserID, "sleepQuality"),
//         borderColor: "rgb(77, 18, 238)",
//         backgroundColor: "rgb(248, 246, 246)",
//         }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: "top",
//         },
//         title: {
//           display: true,
//           text: "Sleep Data for the Latest Week",
//         }
//       }
//     }
//   });
//   }
