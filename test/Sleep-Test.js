import { expect } from 'chai'
import Sleep from '../src/Sleep-Class'
const sleepDataSample = require('../src/data/sample-data')
const weekSleepData = require('../src/data/sample-weekSleepData')



describe('Sleep', () => {
  let sleep
 beforeEach(function() {
  sleep = new Sleep(sleepDataSample)
 })
it('should be a function', function() {
  expect(Sleep).to.be.a('function')
})

it('should instantiate a Sleep class', function() {
  expect(sleep).to.be.an.instanceof(Sleep)
})

it('should keep track of sleep data', function() {
  expect(sleep.sleepDataSample).to.eql(sleepDataSample)
})

it('should calculate the average hours of sleep per day', function(){
  expect(sleep.calculateAverageSleep('hoursSlept')).to.equal(9)
}) 

it('should calculate the average sleep quality per day', function() {
  expect(sleep.calculateAverageSleep('sleepQuality')).to.equal(4)
})

it('should calculate sleep hours per day by date', function() {
  expect(sleep.calculateSleepPerDay('2019/06/17', 'hoursSlept')).to.equal(10.5)
})

it('should calculate sleep quality per day by date', function() {
  expect(sleep.calculateSleepPerDay('2019/06/17', 'sleepQuality')).to.equal(3.7)
})
})