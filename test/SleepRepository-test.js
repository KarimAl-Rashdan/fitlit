import { expect } from 'chai'
import SleepRepository from '../src/SleepRepository'
const data = require('../src/data/sample-data')
const sleepDataSample = data.sleepData
const weekData = require('../src/data/sample-weekSleepData')
const weekSleepData = weekData.userWeekSleepData


describe('SleepRepository-test', () => {

  let sleepRepo, sleepRepo2

 beforeEach(function() {

  sleepRepo = new SleepRepository(sleepDataSample)
  sleepRepo2 = new SleepRepository(weekSleepData)

 });

it('should be a function', function() {
  expect(SleepRepository).to.be.a('function')
});

it('should instantiate a Sleep class', function() {
  expect(sleepRepo).to.be.an.instanceof(SleepRepository)
});

it('should keep track of sleep data', function() {
  expect(sleepRepo.sleepData).to.eql(sleepDataSample) //change here
});

it('should return all sleep info for one user', function() {
  expect(sleepRepo2.filterSleepByUser(sleepRepo2.sleepData[3].userID)).to.eql(weekSleepData)
});

it('should return most recent sleep data for user', function(){
  expect(sleepRepo2.findTodaysData(1)).to.deep.equal( {userID: 1, date: '2019/06/23', hoursSlept: 10.5, sleepQuality: 3.7})
})
it('should calculate the average hours of sleep per day', function(){
  expect(sleepRepo2.calculateAverageSleepPerDay('hoursSlept', weekSleepData, 1)).to.equal(9)
});

it('should calculate the average sleep quality per day', function() {
  expect(sleepRepo2.calculateAverageSleepPerDay('sleepQuality', weekSleepData, 1)).to.equal(3)
});

it('should calculate sleep hours per day by date', function() {
  expect(sleepRepo.calculateSleepByDate('2019/06/15', 'hoursSlept', 1)).to.eql([6.1])
});

it('should calculate sleep quality per day by date', function() {
  expect(sleepRepo.calculateSleepByDate('2019/06/15', 'sleepQuality', 1)).to.eql([2.2])
});

it('should calculate the hours slept in any given week', function() {
  expect(sleepRepo2.calculateSleepPerWeek('2019/06/22', 1)).to.eql([
    {date: '2019/06/15', hoursSlept: 6.1, sleepQuality: 2.2},
    {date: "2019/06/16", hoursSlept: 4.1, sleepQuality: 3.8},
    {date: "2019/06/18", hoursSlept: 10.4, sleepQuality: 3.1},
    {date: "2019/06/19", hoursSlept: 10.7, sleepQuality: 1.2},
    {date: "2019/06/20", hoursSlept: 9.3, sleepQuality: 1.2},
    {date: "2019/06/21", hoursSlept: 7.8, sleepQuality: 4.2},
    {date: '2019/06/22', hoursSlept: 10.8, sleepQuality: 4.7}])
  });

  it('should calculate the average hours of sleep and sleep quality per day', function() {
    expect(sleepRepo.calcAvgSleepStats('hoursSlept')).to.equal(9);
    expect(sleepRepo.calcAvgSleepStats('sleepQuality')).to.equal(4);
  });

});
