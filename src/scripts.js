// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

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
import Sleep from "./Sleep-Class.js"
import SleepRepository from "./SleepRepository"
// import { sharing } from 'webpack';
import Chart from 'chart.js/auto';
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
let myHydrationChart = new Chart(hydrationChart, {
    type: 'doughnut',
    data: {
        labels: [
            'Consumed oz',
            'Daily need',
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [100, 300],
            backgroundColor: [
              '#f3871ede',
              '#73519b',

            ],
            hoverOffset: 4
          }]
    },
    options: {
        cutout: '75%',
        radius: '65%',
        plugins: {
            legend: {
                display: true,
            }
        }
    }
});
const updateChart = (chart,value,total) => {
	// chart.
}     
// API AREA 

const userAPI = "https://fitlit-api.herokuapp.com/api/v1/users";
const sleepAPI = "https://fitlit-api.herokuapp.com/api/v1/sleep";
const hydrationAPI = "https://fitlit-api.herokuapp.com/api/v1/hydration";

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


// Query Selectors 
const hydrationBtn = document.querySelector('#hydration')
const hydrationDisplay = document.querySelector('.hydration-widget')
const toggleHomeBtn = document.querySelector('.back-home')
const ouncesDrankToday = document.getElementById('todaysOz')
const calendarSub = document.getElementById('dateInputt')
const calendarDate = document.getElementById('dateSelected')
const hydrationWeeklyAvg = document.getElementById('weeklyAvg')
const hydrationChart = document.getElementById('hydration-Chart')

// addEventListener
hydrationBtn.addEventListener('click',showHydrationArea)
toggleHomeBtn.addEventListener('click', homeWidget)
window.addEventListener('load', function(){
	getAPIData(url); 
	getRandomUser(allUserData)});

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
	console.log('object',userWeeklyData)
  hydrationWeeklyAvg.innerHTML =`
	<canvas id='hydration-chart> </canvas>`
const labels = Object.keys(userWeeklyData);
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: Object.values(userWeeklyData),
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

	
}



// hydrationWeeklyAvg


















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

