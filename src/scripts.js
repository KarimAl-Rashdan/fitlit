// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import "../src/css/styles.css";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "../src/images/turing-logo.png";

console.log("This is the JavaScript entry file - your code begins here.");

// An example of how you tell webpack to use a JS file

import UserRepository from "./UserRepository";
import getAPIData from "./apiCalls";
import User from "./User-Class";

import Hydration from "./Hydration"
import HydrationRepository from "./Hydration-Repository"
import Sleep from "./Sleep-Class.js"
import SleepRepository from "./SleepRepository"
import dayjs from 'dayjs'
import generateChart from '../src/data/usersChart'
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
      getRandomUser(allUserData)
      restrictCalendarRangeMin()
      restrictCalendarRangeMax()
      
    })
    .catch((error) => {
      console.log(error);
    });
}


// Query Selectors 
const hydrationBtn = document.querySelector('#hydration')
const hydrationDisplay = document.querySelector('.hydration-widget')
const toggleHomeBtn = document.querySelector('.back-home')
const ouncesDrankToday = document.getElementById('todaysOz')
const calendarSub = document.getElementById('dateInput')
const calendarDate = document.getElementById('dateSelected')
const hydrationWeeklyAvg = document.getElementById('weeklyAvg')
const hydroAllTimeAvgArea = document.getElementById('allTimeAvg')

const welcomeContainer = document.getElementById("user-info");
const stepsWidget = document.getElementById("steps-widget");
const stepsButton = document.getElementById("steps");
const userFriendsSection = document.getElementById("friends-info");
const returnStepsWidgetButton = document.getElementById("return-to-widget");
const sleepWidgetButton = document.getElementById("sleep");
const sleepWidget = document.getElementById("sleep-widget");
const returnSleepWidgetButton = document.getElementById("return-to-sleep-widget");


// addEventListener
hydrationBtn.addEventListener('click',function() {
  showHydrationArea();
  displayHydrationDom();
})
toggleHomeBtn.addEventListener('click', homeWidget)
window.addEventListener('load', function(){
  getPageData()
})

stepsButton.addEventListener("click", updateStepWidget);
returnStepsWidgetButton.addEventListener("click", (event) => {
  returnToStepsWidget(event);
});
sleepWidgetButton.addEventListener("click", updateSleepData);

returnSleepWidgetButton.addEventListener("click", returnToSleepWidget);

calendarSub.addEventListener('click',displayWeeklyAverage)




// Functions 


function createClassInstances(dataSet1, dataSet2, dataSet3) {
  allUserData = dataSet1.map((user) => new User(user));
  userRepository = new UserRepository(allUserData);
  allSleepData = dataSet2.map((data) => new Sleep(data));
  sleepRepository = new SleepRepository(allSleepData);
  allHydroData = dataSet3.map(data => new Hydration(data));
  hydrationRepository = new HydrationRepository(allHydroData)

}


function getRandomUser(allUserData) {
  const randomID = Math.floor(Math.random() * allUserData.length);
  currentUser = allUserData[randomID];
  currentUserID = allUserData[randomID].id;
  updateUserInfo();
  updateFriendsInfo();
  return currentUserID;
};

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


//  Hydration Area 
function showHydrationArea() {
	showArea(hydrationBtn,toggleHomeBtn,hydrationDisplay)
}
function homeWidget(){
	hideArea(hydrationBtn,toggleHomeBtn,hydrationDisplay)
}

function displayHydrationDom() {
 displayTodaysHydration(hydrationRepository,currentUserID);
 displayAverageConsumed();
}

function restrictCalendarRangeMin() {
  const usersRecordedDates = hydrationRepository.filterHydrationByUser(currentUserID);
  const min = usersRecordedDates.sort((a,b)=> new Date(a.date) - new Date(b.date));
  const minDateEdit = min[0].date;
  const minValue = minDateEdit.replaceAll('/','-');
  return calendarDate.setAttribute('min',minValue);
  
  

}
function restrictCalendarRangeMax() {
  const usersRecordedDates = hydrationRepository.filterHydrationByUser(currentUserID);
  const max = usersRecordedDates.sort((a,b)=> new Date(b.date) - new Date(a.date));
  const maxDateEdit = max[0].date;
  const maxValue = maxDateEdit.replaceAll('/','-');
  return calendarDate.setAttribute('max',maxValue);
}
  
  


function displayTodaysHydration(hydrationRepository,currentUserID) {
  const todaysOz = hydrationRepository.findTodaysHydration(currentUserID);
	ouncesDrankToday.innerText = `Today's you drank ${todaysOz} oz! `;
}

function displayWeeklyAverage(e) {
	e.preventDefault();
  hydrationWeeklyAvg.innerHTML = '';
	const chosenDate = calendarDate.value; 
	const alteredDate = chosenDate.replaceAll('-',"/");
	const userWeeklyData = hydrationRepository.findWeeklyHydration(alteredDate,currentUserID);
	userWeeklyData.forEach((recordedDay) => {
		hydrationWeeklyAvg.innerHTML += 
		`<p class="hydration-weekly">
		  ${dayjs(recordedDay.date).format('dd/MMM/D/YYYY')} you consumed ${recordedDay.numOunces} ounces
		</p>`
	})	
}

function displayAverageConsumed() {
const averageWaterAllTime = hydrationRepository.getAverageHydration(currentUserID);
const roundedAverage = Math.trunc(averageWaterAllTime);
hydroAllTimeAvgArea.innerText = `All time average oz consumed is ${roundedAverage} oz !`;
}

function updateStepWidget() {
  showArea(stepsButton,stepsWidget,returnStepsWidgetButton)
  stepsWidget.innerHTML = `<ul> 
      <li>Stride Length: ${currentUser.strideLength} </li>
      <li>Your Daily Step Goal: ${
        currentUser.dailyStepGoal
      } Steps<br>Average Step Goal for All Users: ${userRepository.calculateAverageStepGoal()} Steps</li>
    </ul>`
};

function returnToStepsWidget(event) {
  event.preventDefault();
  hideArea(stepsButton,stepsWidget,returnStepsWidgetButton)
  // stepsWidget.classList.add("hidden");
  // stepsButton.classList.remove("hidden");
  // returnStepsWidgetButton.classList.add("hidden");
};


// helperFunctions
function showArea(area1, area2, area3) {
area1.classList.add('hidden');
area2.classList.remove('hidden');
area3.classList.remove('hidden');

}

function hideArea(area1, area2, area3) {
area1.classList.remove('hidden');
area2.classList.add('hidden');
area3.classList.add('hidden');
}


function updateSleepData() {
  sleepWidgetButton.classList.add("hidden");
  sleepWidget.classList.remove("hidden");
  returnSleepWidgetButton.classList.remove("hidden");
  sleepWidget.innerHTML = `
          <ul>
            <li>Hours Slept Today: ${sleepRepository.findTodaysData(currentUserID).hoursSlept}</li>
            <li>Sleep Quality for Today: ${sleepRepository.findTodaysData(currentUserID).sleepQuality}</li>
            <li>Hours Slept for the Week: ${findLatestWeeksSleepData(currentUserID, 'hoursSlept')}</li>
            <li>Sleep Quality for the Week: ${findLatestWeeksSleepData(currentUserID, 'sleepQuality')}</li>
            <li>Your All Time Hours Slept Average: ${displayAverageSleepDataForAllTime('hoursSlept')} hours</li>
            <li>Your All Time Sleep Quality Average: ${displayAverageSleepDataForAllTime('sleepQuality')}</li>
          </ul>
          `
};

function findLatestWeeksSleepData(id, type) {
  dateForWeek = sleepRepository.findTodaysData(id).date;
  let dataForWeek = sleepRepository.calculateSleepPerWeek(dateForWeek, id);
  let dataResult = dataForWeek.reduce((acc, cur, index) => {
    acc.push(` day ${index + 1}: ${cur[type]} `);
    return acc; 
  }, [])
  return dataResult;
}

function displayAverageSleepDataForAllTime(type) {
  return sleepRepository.calcAvgSleepStats(type);
};

function returnToSleepWidget(event) {
  event.preventDefault();
  sleepWidgetButton.classList.remove("hidden");
  sleepWidget.classList.add("hidden");
  returnSleepWidgetButton.classList.add("hidden");
};
