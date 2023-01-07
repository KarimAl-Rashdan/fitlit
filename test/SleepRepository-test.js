import { expect } from "chai";
import SleepRepository from "../src/SleepRepository";
import data from "../src/data/sample-data";
import weekData from "../src/data/sample-weekSleepData";

describe("SleepRepository", () => {
  let sleepRepo, sleepRepo2;

  beforeEach(function () {
    sleepRepo = new SleepRepository(data);
    sleepRepo2 = new SleepRepository(weekData);
  });

  it("should be a function", function () {
    expect(SleepRepository).to.be.a("function");
  });
  it("should instantiate a Sleep class", function () {
    expect(sleepRepo).to.be.an.instanceof(SleepRepository);
  });
  it("should keep track of sleep data", function () {
    expect(sleepRepo.sleepData).to.eql(data);
  });
  it("should return all sleep info for one user", function () {
    expect(sleepRepo2.filterSleepByUser(sleepRepo2.sleepData[3].userID)).to.eql(
      weekData
    );
  });
  it("should return most recent sleep data for user", function () {
    expect(sleepRepo2.findTodaysData(1)).to.deep.equal({
      userID: 1,
      date: "2019/06/23",
      hoursSlept: 10.5,
      sleepQuality: 3.7,
    });
  });
  it("should calculate the average hours of sleep per day", function () {
    expect(
      sleepRepo2.calculateAverageSleepPerDay("hoursSlept", weekData, 1)
    ).to.equal(9);
  });
  it("should calculate the average sleep quality per day", function () {
    expect(
      sleepRepo2.calculateAverageSleepPerDay("sleepQuality", weekData, 1)
    ).to.equal(3);
  });
  it("should calculate sleep hours per day by date", function () {
    expect(
      sleepRepo.calculateSleepByDate("2019/06/15", "hoursSlept", 1)
    ).to.eql([6.1]);
  });
  it("should throw an error if date is undefined", function () {
    expect(sleepRepo.calculateSleepByDate(null, "hoursSlept", 1)).to.equal(
      "Pick a date"
    );
  });

  it("should calculate sleep quality per day by date", function () {
    expect(
      sleepRepo.calculateSleepByDate("2019/06/15", "sleepQuality", 1)
    ).to.eql([2.2]);
  });
  it("should throw an error if date is undefined", function () {
    expect(sleepRepo.calculateSleepByDate(null, "sleepQuality", 1)).to.equal(
      "Pick a date"
    );
  });

  it("should calculate the hours slept in any given week", function () {
    expect(sleepRepo2.calculateAvgSleepPerWeek("2019/06/22", 1, "hoursSlept")).to.equal(8);
    expect(sleepRepo2.calculateAvgSleepPerWeek("2019/06/22", 1, "sleepQuality")).to.equal(3);
  });
  it("should calculate the average hours of sleep and sleep quality per day", function () {
    expect(sleepRepo.calcAvgSleepStats("hoursSlept")).to.equal(9);
    expect(sleepRepo.calcAvgSleepStats("sleepQuality")).to.equal(4);
  });
});
