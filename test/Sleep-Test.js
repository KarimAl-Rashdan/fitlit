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

 });

it('should be a function', function() {
  expect(Sleep).to.be.a('function')
});

it('should instantiate a Sleep class', function() {
  expect(sleep).to.be.an.instanceof(Sleep)
});

it('should keep track of sleep data', function() {
  expect(sleep.sleepData).to.eql(sleepDataSample) //change here
});

it('should return all sleep info for one user', function() {
  expect(sleep2.filterSleepByUser(sleep2.sleepData[3].userID)).to.eql(weekSleepData)
});

it('should calculate the average hours of sleep per day', function(){
  expect(sleep2.calculateAverageSleepPerDay('hoursSlept', weekSleepData, 1)).to.equal(9)
});

it('should calculate the average sleep quality per day', function() {
  expect(sleep2.calculateAverageSleepPerDay('sleepQuality', weekSleepData, 1)).to.equal(3)
});

it('should calculate sleep hours per day by date', function() {
  expect(sleep.calculateSleepByDate('2019/06/15', 'hoursSlept', 1)).to.eql([6.1])
});

it('should calculate sleep quality per day by date', function() {
  expect(sleep.calculateSleepByDate('2019/06/15', 'sleepQuality', 1)).to.eql([2.2])
});

it('should calculate the hours slept in any given week', function() {
  expect(sleep2.calculateSleepPerWeek('2019/06/22', 1)).to.eql([
    {date: '2019/06/15', hoursSlept: 6.1, sleepQuality: 2.2},
    {date: "2019/06/16", hoursSlept: 4.1, sleepQuality: 3.8},
    {date: "2019/06/18", hoursSlept: 10.4, sleepQuality: 3.1},
    {date: "2019/06/19", hoursSlept: 10.7, sleepQuality: 1.2},
    {date: "2019/06/20", hoursSlept: 9.3, sleepQuality: 1.2},
    {date: "2019/06/21", hoursSlept: 7.8, sleepQuality: 4.2},
    {date: '2019/06/22', hoursSlept: 10.8, sleepQuality: 4.7}])
  });

  it('should calculate the average hours of sleep and sleep quality per day', function() {
    expect(sleep.calcAvgSleepStats('hoursSlept')).to.equal(9);
    expect(sleep.calcAvgSleepStats('sleepQuality')).to.equal(4);
  });

});
