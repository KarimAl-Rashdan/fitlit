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
      getRandomUser(allUserData)
      generateChart();
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



// addEventListener
hydrationBtn.addEventListener('click',showHydrationArea)
toggleHomeBtn.addEventListener('click', homeWidget)
window.addEventListener('load', getPageData)



calendarSub.addEventListener('click',displayWeeklyAverage)




// Functions 

function createClassInstances(dataSet1, dataSet2, dataSet3) {
  allUserData = dataSet1.map((user) => new User(user));
  userRepository = new UserRepository(allUserData);
  getRandomUser(allUserData);
  allSleepData = dataSet2.map(data => new Sleep(data));
  sleepRepository = new SleepRepository(allSleepData);
  allHydroData = dataSet3.map(data => new Hydration(data));
  hydrationRepository = new HydrationRepository(allHydroData)
	displayHydrationDom(hydrationRepository, getRandomUser(allUserData));
}

function getRandomUser(allUserData) {
  const randomID = Math.floor(Math.random() * allUserData.length);
  currentUser = allUserData[randomID];
  currentUserID = allUserData[randomID].id;
  return currentUserID;
}





//  Hydration Area 
function showHydrationArea(){
	showArea(hydrationBtn,toggleHomeBtn,hydrationDisplay)
}
function homeWidget(){
	hideArea(hydrationBtn,toggleHomeBtn,hydrationDisplay)
}

function displayHydrationDom(hydrationRepository, currentUserId) {
 displayTodaysHydration( hydrationRepository,currentUserId)
 displayAverageConsumed()
 

}

function displayTodaysHydration(hydrationRepository,currentUserID) {
	const todaysOz = hydrationRepository.findTodaysHydration(currentUserID);
	ouncesDrankToday.innerText = `Today's you drank ${todaysOz} oz! `
}

function displayWeeklyAverage(e) {
	e.preventDefault()
	const chosenDate = calendarDate.value; 
	const alteredDate = chosenDate.replaceAll('-',"/")
	const userWeeklyData = hydrationRepository.findWeeklyHydration(alteredDate,currentUserID)
	userWeeklyData.forEach((recordedDay) => {
		hydrationWeeklyAvg.innerHTML += 
		`<p class="hydration-weekly">
		  ${dayjs(recordedDay.date).format('dd/MMM/D/YYYY')} you consumed ${recordedDay.numOunces} ounces
		</p>`
	})	
}

function displayAverageConsumed() {
const averageWaterAllTime = hydrationRepository.getAverageHydration(currentUserID)
const roundedAverage = Math.trunc(averageWaterAllTime)
hydroAllTimeAvgArea.innerText = `All time Average daily drink consumption is ${roundedAverage} oz !`
}



















// helperFunctions
function showArea(area1, area2, area3) {
area1.classList.add('hidden')
area2.classList.remove('hidden')
area3.classList.remove('hidden')

}

function hideArea(area1, area2, area3) {
area1.classList.remove('hidden')
area2.classList.add('hidden')
area3.classList.add('hidden')

}

