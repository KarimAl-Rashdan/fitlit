import { expect } from "chai";
import sampleActivityData from "../src/data/sample-acitvity";
import ActivityRepository from "../src/ActivityRepository";
import User from "../src/User";

describe("ActivityRepository", () => {
  let activityData;
  let user1;
  let activityRepo;

  beforeEach(() => {
    activityData = sampleActivityData;
    activityRepo = new ActivityRepository(activityData);
    user1 = new User({
      id: 1,
      name: "Luisa Hane",
      address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      email: "Diana.Hayes1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [16, 4, 8],
    });
  });
  it("Should be a function", function () {
    expect(ActivityRepository).to.be.a("function");
  });
  it("Should be an instance of ActivityRepository", () => {
    expect(activityRepo).to.be.an.instanceOf(ActivityRepository);
  });
  it("Should hold all of the activity data", () => {
    expect(activityRepo.allActivityData).to.eql(activityData);
  });
  it("Should be able to filter by the current user ID", () => {
    const a = [
      {
        userID: 1,
        date: "2019/06/15",
        numSteps: 3577,
        minutesActive: 140,
        flightsOfStairs: 16,
      },
      {
        userID: 1,
        date: "2019/06/16",
        numSteps: 4294,
        minutesActive: 138,
        flightsOfStairs: 10,
      },
      {
        userID: 1,
        date: "2019/06/17",
        numSteps: 7402,
        minutesActive: 116,
        flightsOfStairs: 33,
      },
      {
        userID: 1,
        date: "2019/06/18",
        numSteps: 3486,
        minutesActive: 114,
        flightsOfStairs: 32,
      },
      {
        userID: 1,
        date: "2019/06/19",
        numSteps: 11374,
        minutesActive: 213,
        flightsOfStairs: 13,
      },
      {
        userID: 1,
        date: "2019/06/20",
        numSteps: 14810,
        minutesActive: 287,
        flightsOfStairs: 18,
      },
      {
        userID: 1,
        date: "2019/06/21",
        numSteps: 2634,
        minutesActive: 107,
        flightsOfStairs: 5,
      },
    ];
    expect(activityRepo.filterById(1)).to.eql(a);
  });
  it("Should evaluate which days a user exceeded their step goal", () => {
    const a = [
      {
        userID: 1,
        date: "2019/06/19",
        numSteps: 11374,
        minutesActive: 213,
        flightsOfStairs: 13,
      },
      {
        userID: 1,
        date: "2019/06/20",
        numSteps: 14810,
        minutesActive: 287,
        flightsOfStairs: 18,
      },
    ];
    expect(activityRepo.findDaysExceededGoal(1, user1)).to.eql(a);
  });
  it("Should find the user's all time stair climbing record", () => {
    expect(activityRepo.findClimbingRecord(1)).to.eql(33);
  });
  it("Should calculate the average activity for all users for a specified date", () => {
    expect(activityRepo.getUsersAvgForDay("2019/06/15", "numSteps")).to.equal(8361);
    expect(activityRepo.getUsersAvgForDay("2019/06/15", "minutesActive")).to.equal(79);
    expect(activityRepo.getUsersAvgForDay("2019/06/15", "flightsOfStairs")).to.equal(22);
  });
  it("Should find user activity for the latest day", () => {
    expect(activityRepo.findUserDataForToday(1)).to.eql({
      userID: 1,
      date: "2019/06/21",
      numSteps: 2634,
      minutesActive: 107,
      flightsOfStairs: 5
      })
  })
});
