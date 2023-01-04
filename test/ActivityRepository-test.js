import { expect } from "chai"
import sampleActivityData from "../src/data/sample-acitvity"
import ActivityRepository from "../src/ActivityRepository"
import User from "../src/User"



describe('ActivityRepository', () => {
  let activityData;
  let activity1;
  let user1;

  beforeEach(() => {
    activityData = sampleActivityData
    activity1 = new ActivityRepository(activityData)
    user1 = new User({
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [
        16,
        4,
        8
      ]
    })
  })
  it("should be a function", function() {
    expect(ActivityRepository).to.be.a("function")
  })
  it("should make an instance of ActivityRepository", function() {
    expect(activity1).to.be.an.instanceOf(ActivityRepository)
  })
  it("should hold an array of activity data", function() {
    expect(activity1.activityData).to.eql(activityData)
  })
  it("should default current user's info to null", function() {
    expect(activity1.currentUsersActivities).to.equal(null)
  })
  it('should give back all activity data that matches the current user', function() {
    const currentuserlist = [
      {
        userID: 1,
        date: '2019/06/15',
        numSteps: 3577,
        minutesActive: 140,
        flightsOfStairs: 16
      },
      {
        userID: 1,
        date: '2019/06/16',
        numSteps: 4294,
        minutesActive: 138,
        flightsOfStairs: 10
      },
      {
        userID: 1,
        date: '2019/06/17',
        numSteps: 7402,
        minutesActive: 116,
        flightsOfStairs: 33
      },
      {
        userID: 1,
        date: '2019/06/18',
        numSteps: 3486,
        minutesActive: 114,
        flightsOfStairs: 32
      },
      {
        userID: 1,
        date: '2019/06/19',
        numSteps: 11374,
        minutesActive: 213,
        flightsOfStairs: 13
      },
      {
        userID: 1,
        date: '2019/06/20',
        numSteps: 14810,
        minutesActive: 287,
        flightsOfStairs: 18
      },
      {
        userID: 1,
        date: '2019/06/21',
        numSteps: 2634,
        minutesActive: 107,
        flightsOfStairs: 5
      }
    ]
    expect(activity1.filterById(1)).to.deep.equal(currentuserlist)
  })
  it("should store the current users information", function() {
    const currentuserlist = [
      {
        userID: 1,
        date: '2019/06/15',
        numSteps: 3577,
        minutesActive: 140,
        flightsOfStairs: 16
      },
      {
        userID: 1,
        date: '2019/06/16',
        numSteps: 4294,
        minutesActive: 138,
        flightsOfStairs: 10
      },
      {
        userID: 1,
        date: '2019/06/17',
        numSteps: 7402,
        minutesActive: 116,
        flightsOfStairs: 33
      },
      {
        userID: 1,
        date: '2019/06/18',
        numSteps: 3486,
        minutesActive: 114,
        flightsOfStairs: 32
      },
      {
        userID: 1,
        date: '2019/06/19',
        numSteps: 11374,
        minutesActive: 213,
        flightsOfStairs: 13
      },
      {
        userID: 1,
        date: '2019/06/20',
        numSteps: 14810,
        minutesActive: 287,
        flightsOfStairs: 18
      },
      {
        userID: 1,
        date: '2019/06/21',
        numSteps: 2634,
        minutesActive: 107,
        flightsOfStairs: 5
      }
    ]
    activity1.filterById(1)
    expect(activity1.currentUsersActivities).to.deep.equal(currentuserlist)
  })
  it('should find miles walked by a specified date', function() {
    activity1.filterById(1)
    expect(activity1.findMilesWalked('2019/06/21', user1)).to.equal(2.15)
  })


})