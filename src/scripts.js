import "../src/css/styles.css";
import "../src/images/turing-logo.png";
import "../src/images/exercise.png";
import "../src/images/friends.png";
import "../src/images/intro.jpg";
import "../src/images/sleeping.png";
import "../src/images/water.png";
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
      createClassInstances(
        allUserData,
        allSleepData,
        allHydroData,
        allActivityData
      );
      getRandomUser(allUserData);
      // restrictCalendarRange();
    })
    .catch((error) => {
      fetchFailureDisplay.classList.remove("hidden");
    });
}

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
const activityWidget = document.getElementById("activity-widget");
const activityButton = document.getElementById("activity");
const returnActivityWidgetButton = document.getElementById(
  "return-to-activity-widget"
);
const stepsButton = document.getElementById("steps");
const userFriendsSection = document.getElementById("friends-info");
const returnStepsWidgetButton = document.getElementById("return-to-widget");
const sleepWidgetButton = document.getElementById("sleep");
const sleepWidget = document.getElementById("sleep-widget");
const returnSleepWidgetButton = document.getElementById(
  "return-to-sleep-widget"
);
const fetchFailureDisplay = document.getElementById("fetch-failure");
const postFailureDisplay = document.getElementById("post-failure");
const inputForm = document.getElementById("input-form");
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
const doublePostSection = document.getElementById('double-post-section');

hydrationBtn.addEventListener("click", function () {
  showHydrationArea();
  displayHydrationDom();
});
toggleHomeBtn.addEventListener("click", (event) => {
  returnToWidget(event, hydrationBtn, toggleHomeBtn, hydrationDisplay);
});
window.addEventListener("load", function () {
  calendarSub.disabled = true;
  getPageData();
});
stepsButton.addEventListener("click", updateStepWidget);
activityButton.addEventListener("click", findWeeklyData);
returnActivityWidgetButton.addEventListener("click", (event) => {
  returnToWidget(
    event,
    activityButton,
    activityWidget,
    returnActivityWidgetButton
  );
});
returnStepsWidgetButton.addEventListener("click", (event) => {
  returnToWidget(event, stepsButton, stepsWidget, returnStepsWidgetButton);
});
sleepWidgetButton.addEventListener("click", () => {
  updateSleepData()
  sleepWeek.classList.remove('hidden')
});
returnSleepWidgetButton.addEventListener("click", (event) => {
  sleepWeek.classList.add('hidden')
  returnToWidget(event, sleepWidgetButton, sleepWidget, returnSleepWidgetButton)
});
calendarSub.addEventListener('click', (e) => {
   e.preventDefault();
  displayWeeklyAverage()
});
calendarDate.addEventListener('mousedown', enableSubmit);
showFormBtn.addEventListener('click', (event) => {
  showInputForm(event)
});
inputSub.addEventListener("click", (event) => {
  createPostObject(event);
});
postForm.addEventListener("click", toggleAriaChecked);

function createClassInstances(dataSet1, dataSet2, dataSet3, dataSet4) {
  allUserData = dataSet1.map((user) => new User(user));
  userRepository = new UserRepository(allUserData);
  allSleepData = dataSet2.map((data) => new Sleep(data));
  sleepRepository = new SleepRepository(allSleepData);
  allHydroData = dataSet3.map((data) => new Hydration(data));
  hydrationRepository = new HydrationRepository(allHydroData);
  allActivityData = dataSet4.map((data) => new Activity(data));
  activityRepository = new ActivityRepository(allActivityData);
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
    userFriendsSection.innerHTML += `<div class="user-friends" id="friend">
      <h2>${userRepository.findUser(friend).name}</h2><br>
      <h3>Step Goal: ${userRepository.findUser(friend).dailyStepGoal}</h3>
    </div>`;
  });
}

function showHydrationArea() {
  showArea(hydrationBtn, toggleHomeBtn, hydrationDisplay);
}

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
}

function displayTodaysHydration(hydrationRepository, currentUserID) {
  const todaysOz = hydrationRepository.findTodaysHydration(currentUserID);
  ouncesDrankToday.innerText = `Today's you drank ${todaysOz} oz! `;
}

function displayWeeklyAverage() {
  // e.preventDefault();
  if(calendarDate.value) {
  calendarSub.disabled = false
  hydrationWeeklyAvg.innerHTML = '';
	const chosenDate = calendarDate.value; 
	const alteredDate = chosenDate.replaceAll('-',"/");
	const userWeeklyData = hydrationRepository.findWeeklyHydration(alteredDate,currentUserID);
	userWeeklyData.forEach((recordedDay) => {
		hydrationWeeklyAvg.innerHTML += 
    `<p class="hydration-weekly">
		  ${dayjs(recordedDay.date).format('dd/MMM/D/YYYY')} you consumed ${recordedDay.numOunces} ounces
		</p>`;
	});
} else {
  calendarSub.disabled = true;
}
};

function displayAverageConsumed() {
  const averageWaterAllTime =
    hydrationRepository.getAverageHydration(currentUserID);
  const roundedAverage = Math.trunc(averageWaterAllTime);
  hydroAllTimeAvgArea.innerText = `All time average oz consumed is ${roundedAverage} oz !`;
}

function findWeeklyData() {
  showArea(activityButton, activityWidget, returnActivityWidgetButton);
  activityWidget.innerHTML = "";
  const userActivity = activityRepository.filterById(currentUserID);
  const todayActivity = activityRepository.determineTodayData();
  const weeklyData = activityRepository
    .findWeeklyData(todayActivity.date)
    .reverse();
  const weeklyKey = weeklyData.forEach((dayActivity) => {
    activityWidget.innerHTML += `<ul>
      <li>${dayActivity.date}: </li>
      <li>Steps: ${dayActivity.numSteps}</li>
      <li>Stairs Climbed: ${dayActivity.flightsOfStairs}</li>
      <li>Minutes Active: ${dayActivity.minutesActive}</li>
      </ul>
    `;
  });
};

function updateStepWidget() {
  showArea(stepsButton, stepsWidget, returnStepsWidgetButton);
  const userActivity = activityRepository.filterById(currentUserID);
  const todayActivity = activityRepository.determineTodayData();
  const userStepsToday = todayActivity.numSteps;
  const userMinActiveToday = todayActivity.minutesActive;
  const userStairsClimbed = todayActivity.flightsOfStairs;
  const numOfMiles = activityRepository.findMilesWalked(
    todayActivity.date,
    currentUser
  );
  const avgSteps = activityRepository.getUsersAvgForDay(
    todayActivity.date,
    "numSteps"
  );
  const avgMinActive = activityRepository.getUsersAvgForDay(
    todayActivity.date,
    "minutesActive"
  );
  const avgStairsClimbed = activityRepository.getUsersAvgForDay(
    todayActivity.date,
    "flightsOfStairs"
  );
  stepsWidget.innerHTML = `<ul> 
      <li>Stride Length: ${currentUser.strideLength} </li>
      <li> Today's Steps: ${userStepsToday} </li>
      <li> Your Activity For Today: ${userMinActiveToday} minutes </li>
        <ul>
          <li> Your Activity vs Avg of All Users Activity </li>
          <li> Steps Activity: ${userStepsToday} vs ${avgSteps} </li>
          <li> Minutes Activity: ${userMinActiveToday} vs ${avgMinActive} </li>
          <li> Stairs Climbed: ${userStairsClimbed} vs ${avgStairsClimbed} </li>
        </ul>
      <li> Miles Walked Today: ${numOfMiles} miles </li>
      <li>Your Daily Step Goal: ${
        currentUser.dailyStepGoal
      } Steps<br>Average Step Goal for All Users: ${userRepository.calculateAverageStepGoal()} Steps</li>
    </ul>`;
};

function returnToWidget(event, area1, area2, area3) {
  event.preventDefault();
  hideArea(area1, area2, area3);
}

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
  showArea(sleepWidgetButton, sleepWidget, returnSleepWidgetButton);
  const userSleep = sleepRepository.filterSleepByUser(currentUserID);
  const todaySleep = sleepRepository.findTodaysData(currentUserID);
  const weeklySleep = sleepRepository.findWeeklyData(todaySleep.date, currentUserID);
  const avgHoursSlept = sleepRepository.calculateAvgSleepPerWeek(todaySleep.date, currentUserID, "hoursSlept");
  const avgSleepQuality = sleepRepository.calculateAvgSleepPerWeek(todaySleep.date, currentUserID, "sleepQuality");
  sleepWeek.innerHTML ='';

  const weeklyKey = weeklySleep.forEach(dayActivity => {
    
    sleepWeek.innerHTML += `<ul>
      <li>${dayActivity.date}: </li>
      <li><span style="font-weight:bold">Hours Slept:</span> ${dayActivity.hoursSlept}</li>
      <li>Sleep Quality: ${dayActivity.sleepQuality}</li>
      </ul>
    `
  });

  sleepWidget.innerHTML = `
          <ul class=widget>
            <li>Hours Slept Today: ${todaySleep.hoursSlept}</li>
            <li>Sleep Quality for Today: ${todaySleep.sleepQuality}</li>
            <li>Your All Time Hours Slept Average: ${avgHoursSlept} hours</li>
            <li>Your All Time Sleep Quality Average: ${avgSleepQuality}</li>
          </ul>
          `;
}


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
};

function enableSubmit() { 
  calendarSub.disabled = false;
};

function createPostObject(event) {
  event.preventDefault()
  if(findExistingData(allSleepData, currentUserID, inputDate.value)) {
    return
  }
  else {
    if(inputSleepQuality.value && inputHoursSlept.value) {
      const sleepObject = {userID: currentUserID, date: inputDate.value.replaceAll('-',"/"), hoursSlept: Number(inputHoursSlept.value), sleepQuality: Number(inputSleepQuality.value)}
      const sleepEndPoint = "sleep"
      postInformation(sleepEndPoint, sleepObject)
      clearValues(inputSleepQuality,inputHoursSlept)
      inputDate.value = ''
    }
  }
    if(findExistingData(allHydroData, currentUserID, inputDate.value)) {
      return
    }
    else {
      if(inputOzDrank.value) {
        const hydrationObject = {userID: currentUserID, date: inputDate.value.replaceAll('-',"/"), numOunces: Number(inputOzDrank.value)}
        const hydrationEndPoint = "hydration"
        postInformation(hydrationEndPoint, hydrationObject)
        clearValues(inputOzDrank,inputDate)
      }
    }
    if(findExistingData(allActivityData, currentUserID, inputDate.value)) {
      return
    } else {
      if(inputStairs.value && inputMinActive.value && inputSteps.value) {
        const activityObject = {userID: currentUserID, date: inputDate.value.replaceAll('-',"/"), flightsOfStairs: Number(inputStairs.value), minutesActive: Number(inputMinActive.value), numSteps: Number(inputSteps.value)}
        const activityEndPoint = "activity"
        postInformation(activityEndPoint, activityObject)
        clearValues(inputStairs, inputMinActive)
        clearValues(inputSteps, inputDate)
      }
    }
  
}

function clearValues(input1, input2) {
 input1.value = '';
 input2.value = '';
}

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
      return letsTry();
    })
    .catch((error) => {
      fetchFailureDisplay.classList.remove("hidden");
    });
}

function letsTry() {
  Promise.all([
    getAPIData(userAPI),
    getAPIData(sleepAPI),
    getAPIData(hydrationAPI),
    getAPIData(activityAPI)
  ])
  .then((response) => {
    allUserData = response[0].userData;
    allSleepData = response[1].sleepData;
    allHydroData = response[2].hydrationData;
    allActivityData = response[3].activityData;
    createClassInstances(allUserData, allSleepData, allHydroData, allActivityData);
    updateSleepData()
    displayHydrationDom()
    displayWeeklyAverage()
    findWeeklyData()
  });
}

function toggleAriaChecked() {
  radioSleep.setAttribute("aria-checked", radioSleep.checked ? true : false);
  radioHydration.setAttribute("aria-checked", radioHydration.checked ? true : false);
  radioActivity.setAttribute("aria-checked", radioActivity.checked ? true : false);
}

function findExistingData(data, userId, date) {
  doublePostSection.classList.remove("hidden")
  data.find(obj => {
    return obj.userID === userId && obj.date === date
  })
} 
