import { expect } from 'chai'
import Sleep from '../src/Sleep-Class'
const data = require('../src/data/sample-data')
const sleepDataSample = data.sleepData
const weekData = require('../src/data/sample-weekSleepData')
const weekSleepData = weekData.userWeekSleepData



describe('Sleep', () => {

  let sleep, sleep2

 beforeEach(function() {

  sleep = new Sleep(sleepDataSample)
  sleep2 = new Sleep(weekSleepData)

 })
it('should be a function', function() {
  expect(Sleep).to.be.a('function')
})
it('should instantiate a Sleep class', function() {
  expect(sleep).to.be.an.instanceof(Sleep)
})

it('should keep track of sleep data', function() {
  expect(sleep.sleepData).to.eql(sleepDataSample) //change here
})

it('should return all sleep info for one user', function() {
  expect(sleep2.filterSleepByUser(sleep2.sleepData[3].userID)).to.eql(weekSleepData)
})

it('should calculate the average hours of sleep per day', function(){
  expect(sleep2.calculateAverageSleepPerDay('hoursSlept', weekSleepData, 1)).to.equal(9)
})

it('should calculate the average sleep quality per day', function() {
  expect(sleep2.calculateAverageSleepPerDay('sleepQuality', weekSleepData, 1)).to.equal(3)
})

it('should calculate sleep hours per day by date', function() {
  expect(sleep.calculateSleepByDate('2019/06/15', 'hoursSlept', 1)).to.eql([6.1])
})

it('should calculate sleep quality per day by date', function() {
  expect(sleep.calculateSleepByDate('2019/06/15', 'sleepQuality', 1)).to.eql([2.2])
})

// it('should calculate the hours slept in any given week', function() {

//   expect(sleep2.calculateSleepPerWeek('2019/06/22')).to.eql([
//     {date: '2019/06/15', hours: 6.1, Quality: 2.2},
//     {date: "2019/06/16", hours: 4.1, Quality: 3.8},
//     {date: "2019/06/18", hours: 10.4, Quality: 3.1},
//     {date: "2019/06/19", hours: 10.7, Quality: 1.2},
//     {date: "2019/06/20", hours: 9.3, Quality: 1.2},
//     {date: "2019/06/21", hours: 7.8, Quality: 4.2},
//     {date: '2019/06/22', hours: 10.8, Quality: 4.7},
//     {date: '2019/06/23', hours: 10.5, Quality: 3.7}])
//   })
})
