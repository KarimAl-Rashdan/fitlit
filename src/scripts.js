import "../src/css/styles.css";
import "../src/images/exercise.png";
import "../src/images/sleeping.png";
import "../src/images/water.png";
import "../src/images/friends2.jpg";
import UserRepository from "./UserRepository";
import getAPIData from "./apiCalls";
import User from "./User";
import Hydration from "./Hydration";
import HydrationRepository from "./HydrationRepository";
import Sleep from "./Sleep.js";
import SleepRepository from "./SleepRepository";
import dayjs from "dayjs";
import Activity from "./Activity";
import ActivityRepository from "./ActivityRepository";

let allUserData;
let allSleepData;
let allHydroData;
let allActivityData;
let userRepository;
let currentUser;
let currentUserID;
let sleepRepository;
let hydrationRepository;
let dateForWeek;
let activityRepository;

const userAPI = "http://localhost:3001/api/v1/users";
const sleepAPI = "http://localhost:3001/api/v1/sleep";
const hydrationAPI = "http://localhost:3001/api/v1/hydration";
const activityAPI = "http://localhost:3001/api/v1/activity";

function getPageData() {
  Promise.all([
    getAPIData(userAPI),
    getAPIData(sleepAPI),
    getAPIData(hydrationAPI),
    getAPIData(activityAPI),
  ])
    .then((response) => {
      allUserData = response[0].userData;
      allSleepData = response[1].sleepData;
      allHydroData = response[2].hydrationData;
      allActivityData = response[3].activityData;
      createClassInstances(allUserData, allSleepData, allHydroData, allActivityData);
    })
    .catch((error) => {
      fetchFailureDisplay.classList.remove("hidden");
    });
};

const hydrationBtn = document.querySelector("#hydration");
const hydrationDisplay = document.querySelector(".hydration-widget");
const toggleHomeBtn = document.querySelector(".back-home");
const ouncesDrankToday = document.getElementById("todaysOz");
const calendarSub = document.getElementById("dateInput");
const calendarDate = document.getElementById("calendar");
const hydrationWeeklyAvg = document.getElementById("weeklyAvg");
const hydroAllTimeAvgArea = document.getElementById("allTimeAvg");
const welcomeContainer = document.getElementById("user-info");
const stepsWidget = document.getElementById("steps-widget");
const stepsButton = document.getElementById("steps");
const strideLengthDisplay = document.getElementById("strideLength");
const todaysStepsDisplay = document.getElementById("todaysSteps");
const todaysActivity = document.getElementById("todaysActivity");
const weekActivityDisplay = document.querySelector(".week-activity");
const todaysMilesDisplay = document.getElementById("todaysMiles");
const stepGoalDisplay = document.getElementById("stepGoal");
const avgStepGoalDisplay = document.getElementById("avgStepGoal");
const compareSteps = document.getElementById("vsSteps");
const compareMinActive = document.getElementById("vsMinActive");
const compareStairs = document.getElementById("vsStairs");
const userFriendsSection = document.getElementById("friends-info");
const returnStepsWidgetButton = document.getElementById("return-to-widget");
const sleepWidgetButton = document.getElementById("sleep");
const sleepWidget = document.getElementById("sleep-widget");
const returnSleepWidgetButton = document.getElementById("return-to-sleep-widget");
const hoursSleptDisplay = document.getElementById("hoursSlept");
const sleepQualityDisplay = document.getElementById("sleepQuality");
const avgHoursSleptDisplay = document.getElementById("avgHoursSlept");
const avgSleepQualityDisplay = document.getElementById("avgSleepQuality");
const fetchFailureDisplay = document.getElementById("fetch-failure");
const showFormBtn = document.getElementById("input-btn");
const radioSleep = document.getElementById("sleep-input");
const radioHydration = document.getElementById("hydration-input");
const radioActivity = document.getElementById("activity-input");
const sleepForm = document.querySelector(".sleep-form");
const hydrationForm = document.querySelector(".hydration-form");
const activityForm = document.querySelector(".activity-form");
const inputSub = document.querySelector(".form-submit");
const inputDate = document.querySelector(".input-date");
const inputHoursSlept = document.querySelector(".hours-Slept");
const inputSleepQuality = document.querySelector(".sleep-Quality");
const inputOzDrank = document.querySelector(".number-of-oz");
const inputStairs = document.querySelector(".flights-of-stairs");
const inputMinActive = document.querySelector(".minutes-active");
const inputSteps = document.querySelector(".number-of-steps");
const postForm = document.getElementById("post-form");
const postSuccessDisplay = document.querySelector(".post-success-section");
const sleepWeek = document.getElementById("sleep-week");
const doublePostSection = document.getElementById("double-post-section");
const body = document.querySelector(".main-container");
const friendsSection = document.getElementById("friends-container");
const logInSection = document.getElementById("logInSection");
const logInForm = document.getElementById('logInForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const signOutBtn = document.getElementById('signOutBtn');
const logInBtn = document.getElementById('logInBtn');


const domUpdates = {
  displayInvalidLogIn: function() {
    console.log("this is firing")
    window.alert('Sorry, please enter a valid username and password')
  },

  resetInnerHTML: function(element) {
    element.innerText = ``
  },

  showSection: function(element) {
    element.classList.remove('hidden');
  },

  hideSection: function(element) {
    element.classList.add('hidden');
  }
};


hydrationBtn.addEventListener("click",function() {
  showHydrationArea();
  displayHydrationDom();
});
toggleHomeBtn.addEventListener("click", (event) => {
  returnToWidget(event, hydrationBtn, toggleHomeBtn, hydrationDisplay);
});
window.addEventListener("load", function () {
  calendarSub.disabled = true;
  getPageData();
  showLogInSection();
  checkLogInCredentials();
});
stepsButton.addEventListener("click", updateStepWidget);
returnStepsWidgetButton.addEventListener("click", (event) => {
  returnToWidget(event, stepsButton, stepsWidget, returnStepsWidgetButton);
});
sleepWidgetButton.addEventListener("click", () => {
  sleepWeek.classList.remove('hidden')
  showArea(sleepWidgetButton, sleepWidget, returnSleepWidgetButton);
  updateSleepData()
});
returnSleepWidgetButton.addEventListener("click", (event) => {
  sleepWeek.classList.add('hidden')
  returnToWidget(event, sleepWidgetButton, sleepWidget, returnSleepWidgetButton)
});
calendarSub.addEventListener('click', (e) => {
  e.preventDefault();
  displayWeeklyAverage();
});
calendarDate.addEventListener('mousedown', enableSubmit);
showFormBtn.addEventListener('click', (event) => {
  showInputForm(event);
});
inputSub.addEventListener("click", (event) => {
  createPostObject(event);
});
postForm.addEventListener("click", toggleAriaChecked);
logInBtn.addEventListener('click', checkLogInCredentials);
signOutBtn.addEventListener('click', showLogInSection);


function createClassInstances(dataSet1, dataSet2, dataSet3, dataSet4) {
  allUserData = dataSet1.map((user) => new User(user));
  userRepository = new UserRepository(allUserData);
  allSleepData = dataSet2.map((data) => new Sleep(data));
  sleepRepository = new SleepRepository(allSleepData);
  allHydroData = dataSet3.map((data) => new Hydration(data));
  hydrationRepository = new HydrationRepository(allHydroData);
  allActivityData = dataSet4.map((data) => new Activity(data));
  activityRepository = new ActivityRepository(allActivityData);
};

function checkLogInCredentials() {
  const test = username.value.substring(0,4)
  if (test === 'user' && username.value.length >= 5 && username.value.length < 7 && password.value === 'fitlit') {
    const allChar = username.value.split('')
    const getNumber = allChar.filter(char =>{
      return Number(char);
    })
    if(allChar[5] === '0') {
      getNumber.push('0');
    }
    const getString = getNumber.join('');
    const convertToNum = Number(getString);
    const userObj = userRepository.findUser(convertToNum);
    currentUser = userObj;
    currentUserID = userObj.id;
    updateUserInfo();
    updateFriendsInfo();
    hideLogInSection();
    logInForm.reset();
    return currentUserID;
  } else if (username.value || password.value) {
    domUpdates.displayInvalidLogIn();
    logInForm.reset();
  }
};

function updateUserInfo() {
  welcomeContainer.innerHTML = `
  <h1 class="user-name">Welcome, ${currentUser.firstName()}!</h1>
  <h2 class="user-info">${currentUser.address}, ${currentUser.email}</h2>`;
};

function updateFriendsInfo() {
  userFriendsSection.innerHTML = '';
  allUserData[currentUserID].friends.forEach((friend) => {
    userFriendsSection.innerHTML += `<div class="user-friends" id="friend">
      <h2>${userRepository.findUser(friend).name}</h2><br>
      <h3>Step Goal: ${userRepository.findUser(friend).dailyStepGoal}</h3>
    </div>`;
  });
};

function showHydrationArea() {
  showArea(hydrationBtn, toggleHomeBtn, hydrationDisplay);
};

function displayHydrationDom() {
 displayTodaysHydration(hydrationRepository,currentUserID);
 displayAverageConsumed();
 restrictCalendarRange();
};

function restrictCalendarRange() {
  const usersRecordedDates = hydrationRepository.filterHydrationByUser(currentUserID);
  const min = usersRecordedDates.sort((a,b)=> new Date(a.date) - new Date(b.date));
  const minDateEdit = min[0].date;
  const minValue = minDateEdit.replaceAll("/", "-");
  const max = min.reverse()[0].date;
  const maxValue = max.replaceAll("/", "-");
  calendarDate.setAttribute("max", maxValue);
  calendarDate.setAttribute("min", minValue);
};

function displayTodaysHydration(hydrationRepository, currentUserID) {
  const hydroToday = hydrationRepository.findTodaysHydration(currentUserID);
  ouncesDrankToday.innerHTML = `<li> Today:${hydroToday.date} you drank <span>${hydroToday.numOunces} oz</span>!</li>`;
};

function displayWeeklyAverage() {
  if(calendarDate.value) {
  calendarSub.disabled = false  
  hydrationWeeklyAvg.innerHTML = '';
	const chosenDate = calendarDate.value; 
	const alteredDate = chosenDate.replaceAll('-',"/");
	const userWeeklyData = hydrationRepository.findWeeklyHydration(alteredDate,currentUserID);
	userWeeklyData.forEach((recordedDay) => {
    console.log("TEST DATES", recordedDay)
		hydrationWeeklyAvg.innerHTML += 
    `<p class="hydration-weekly">${dayjs(recordedDay.date).format('dd/MMM/D/YYYY')} you consumed <span>${recordedDay.numOunces} ounces</span>
		</p>`;
	});
  } else {
    calendarSub.disabled = true;
  }
}

function displayAverageConsumed() {
  const averageWaterAllTime = hydrationRepository.getAverageHydration(currentUserID);
  const roundedAverage = Math.trunc(averageWaterAllTime);
  hydroAllTimeAvgArea.innerHTML = `<li>All time average oz consumed is <span>${roundedAverage} oz</span>!</li>`;
};

function findWeeklyData() {
  weekActivityDisplay.innerHTML = `<li>Your Activity for the Week</li>`;
  const userActivity = activityRepository.filterById(currentUserID);
  const todayActivity = activityRepository.determineTodayData();
  const weeklyData = activityRepository.findWeeklyData(todayActivity.date).reverse();
  const weeklyKey = weeklyData.forEach((dayActivity) => {
    weekActivityDisplay.innerHTML += `
      <li>${dayActivity.date}: </li>
      <li>Steps: <span>${dayActivity.numSteps}</span></li>
      <li>Stairs Climbed: <span>${dayActivity.flightsOfStairs}</span></li>
      <li>Minutes Active: <span>${dayActivity.minutesActive}</span></li>
    `;
  });
};

function updateStepWidget() {
  showArea(stepsButton, stepsWidget, returnStepsWidgetButton);
  findWeeklyData()
  const userActivity = activityRepository.filterById(currentUserID);
  const todayActivity = activityRepository.determineTodayData();
  const userStepsToday = todayActivity.numSteps;
  const userMinActiveToday = todayActivity.minutesActive;
  const userStairsClimbed = todayActivity.flightsOfStairs;
  const numOfMiles = activityRepository.findMilesWalked(todayActivity.date,currentUser);
  const avgSteps = activityRepository.getUsersAvgForDay(todayActivity.date,"numSteps");
  const avgMinActive = activityRepository.getUsersAvgForDay(todayActivity.date, "minutesActive");
  const avgStairsClimbed = activityRepository.getUsersAvgForDay(todayActivity.date,"flightsOfStairs");
  strideLengthDisplay.innerHTML = `<li>Stride Length: <span>${currentUser.strideLength}</span></li>`;
  todaysStepsDisplay.innerHTML = `<li> Today's Steps: <span>${userStepsToday}</span></li>`;
  todaysActivity.innerHTML = `<li> Your Activity For Today ${todayActivity.date}: <span>${userMinActiveToday} minutes</span></li>`;
  compareSteps.innerHTML = `<li> Steps Activity: <span>${userStepsToday}</span> vs <span>${avgSteps}</span></li>`;
  compareMinActive.innerHTML = `<li> Minutes Activity: <span>${userMinActiveToday}</span> vs <span>${avgMinActive}</span></li>`;
  compareStairs.innerHTML = `<li> Stairs Climbed: <span>${userStairsClimbed}</span> vs <span>${avgStairsClimbed}</span></li>`;
  todaysMilesDisplay.innerHTML = `<li> Miles Walked Today: <span>${numOfMiles} miles </span></li>`;
  stepGoalDisplay.innerHTML = `<li>Your Daily Step Goal: <span>${currentUser.dailyStepGoal} Steps </span></li>`;
  avgStepGoalDisplay.innerHTML= `<li>Average Step Goal for All Users: <span>${userRepository.calculateAverageStepGoal()} Steps</span></li>`;
};

function returnToWidget(event, area1, area2, area3) {
  event.preventDefault();
  hideArea(area1, area2, area3);
};

function showArea(area1, area2, area3) {
  area1.classList.add("hidden");
  area2.classList.remove("hidden");
  area3.classList.remove("hidden");
};

function hideArea(area1, area2, area3) {
  area1.classList.remove("hidden");
  area2.classList.add("hidden");
  area3.classList.add("hidden");
};

function updateSleepData() {
  const userSleep = sleepRepository.filterSleepByUser(currentUserID);
  const todaySleep = sleepRepository.findTodaysData(currentUserID);
  const weeklySleep = sleepRepository.findWeeklyData(todaySleep.date, currentUserID);
  const avgHoursSlept = sleepRepository.calculateAvgSleepPerWeek(todaySleep.date, currentUserID, "hoursSlept");
  const avgSleepQuality = sleepRepository.calculateAvgSleepPerWeek(todaySleep.date, currentUserID, "sleepQuality");
  sleepWeek.innerHTML ='Your Sleep Data for the Week:';
  const weeklyKey = weeklySleep.forEach(dayActivity => {
    sleepWeek.innerHTML += `
      <li>${dayActivity.date}: </li>
      <li>Hours Slept: <span>${dayActivity.hoursSlept}</span></li>
      <li>Sleep Quality: <span>${dayActivity.sleepQuality}</span></li>
      `;
    });
  hoursSleptDisplay.innerHTML = `<li>Hours Slept Today ${todaySleep.date} : <span>${todaySleep.hoursSlept}</span></li>`;
  sleepQualityDisplay.innerHTML = `<li>Sleep Quality for Today: <span>${todaySleep.sleepQuality}</span></li>`;
  avgHoursSleptDisplay.innerHTML = `<li>Your All Time Hours Slept Average: <span>${avgHoursSlept} hours</span></li>`;
  avgSleepQualityDisplay.innerHTML = `<li>Your All Time Sleep Quality Average: <span>${avgSleepQuality}</span></li>`;
};


function showInputForm(event) {
  event.preventDefault();
  inputDate.classList.remove('hidden');
  inputSub.classList.remove('hidden');
  inputDate.setAttribute('required', true);
 if(radioSleep.checked) {
  hideArea(sleepForm, hydrationForm, activityForm);
  inputSleepQuality.setAttribute('required', true);
  inputHoursSlept.setAttribute('required', true);
 } else if(radioHydration.checked) {
  hideArea(hydrationForm, sleepForm, activityForm);
  inputOzDrank.setAttribute('required', true);
 } else if(radioActivity.checked) {
  hideArea(activityForm, hydrationForm, sleepForm);
  inputStairs.setAttribute('required', true);
  inputMinActive.setAttribute('required', true);
  inputSteps.setAttribute('required', true);
 };
}

function enableSubmit() { 
  calendarSub.disabled = false;
}

function createPostObject(event) {
  event.preventDefault()
  if(findExistingData(allSleepData, currentUserID, inputDate.value)) {
    doublePostSection.classList.remove("hidden")
    return
  }
  else {
    if(inputSleepQuality.value && inputHoursSlept.value) {
      const sleepObject = {userID: currentUserID, date: inputDate.value.replaceAll('-',"/"), hoursSlept: Number(inputHoursSlept.value), sleepQuality: Number(inputSleepQuality.value)};
      const sleepEndPoint = "sleep";
      postInformation(sleepEndPoint, sleepObject);
      clearValues(inputSleepQuality,inputHoursSlept);
      inputDate.value = '';
    }
  }
    if(findExistingData(allHydroData, currentUserID, inputDate.value)) {
      doublePostSection.classList.remove("hidden")
      return
    }
    else {
      if (inputOzDrank.value) {
        const hydrationObject = {userID: currentUserID, date: inputDate.value.replaceAll('-',"/"), numOunces: Number(inputOzDrank.value)}
        const hydrationEndPoint = "hydration";
        postInformation(hydrationEndPoint, hydrationObject);
        clearValues(inputOzDrank,inputDate);
      }
    }
    if (findExistingData(allActivityData, currentUserID, inputDate.value)) {
      doublePostSection.classList.remove("hidden");
      return
    } else {
      if(inputStairs.value && inputMinActive.value && inputSteps.value) {
        const activityObject = {userID: currentUserID, date: inputDate.value.replaceAll('-',"/"), flightsOfStairs: Number(inputStairs.value), minutesActive: Number(inputMinActive.value), numSteps: Number(inputSteps.value)};
        const activityEndPoint = "activity";
        postInformation(activityEndPoint, activityObject);
        clearValues(inputStairs, inputMinActive);
        clearValues(inputSteps, inputDate);
      }
    };
};

function clearValues(input1, input2) {
 input1.value = '';
 input2.value = '';
};

function postInformation(endPoint, data ) {
  fetch(`http://localhost:3001/api/v1/${endPoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then((obj) => {
      postSuccessDisplay.classList.remove("hidden");
      return reFetch();
    })
    .catch((error) => {
      fetchFailureDisplay.classList.remove("hidden");
    });
};

function reFetch() {
  Promise.all([
    getAPIData(userAPI),
    getAPIData(sleepAPI),
    getAPIData(hydrationAPI),
    getAPIData(activityAPI),
  ])
  .then((response) => {
    allUserData = response[0].userData;
    allSleepData = response[1].sleepData;
    allHydroData = response[2].hydrationData;
    allActivityData = response[3].activityData;
    createClassInstances(allUserData, allSleepData, allHydroData, allActivityData);
    updateSleepData();
    displayHydrationDom();
    displayWeeklyAverage();
    findWeeklyData();
  });
};

function toggleAriaChecked() {
  radioSleep.setAttribute("aria-checked", radioSleep.checked ? true : false);
  radioHydration.setAttribute("aria-checked", radioHydration.checked ? true : false);
  radioActivity.setAttribute("aria-checked", radioActivity.checked ? true : false);
};

function findExistingData(data, userId, date) {
  data.find(obj => {
    return obj.userID === userId && obj.date === date
  })
};

function showLogInSection() {
  domUpdates.hideSection(body)
  domUpdates.hideSection(friendsSection)
  domUpdates.showSection(logInSection)
};

function hideLogInSection() {
  domUpdates.showSection(body)
  domUpdates.showSection(friendsSection)
  domUpdates.showSection(signOutBtn)
  domUpdates.hideSection(logInSection)
};