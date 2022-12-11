import Chart from 'chart.js/auto';

// sleepchart query select 
const hydroChart = document.getElementById("myChart1")

let xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
let yValues = [55, 49, 44, 24, 15];
let barColors = ["red", "green","blue","orange","brown"];
 
function generateChart() {
   new Chart(hydroChart, {
     type: "bar",
     data: {
       labels: xValues,
       datasets: [{
         backgroundColor: barColors,
         data: yValues
       }]
     },
     
   });
      new Chart(sleepChart, {
     type: "bar",
     data: {
       labels: xValues,
       datasets: [{
         backgroundColor: barColors,
         data: yValues
       }]
     },
     
   });
   
 }
// 


export default generateChart