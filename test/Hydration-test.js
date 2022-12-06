import { expect } from "chai";
const { hydrationData } = require("../src/data/hydration-data");
const { Hydration } = require("../src/data/Hydration");

describe("Hydration Class", function () {
  let hydration;
  beforeEach(function () {
    hydration = new Hydration(hydrationData);
  });
  it("should be a function", function () {
    expect(Hydration).to.be.a("function");
  });
  it("should make an an instance of Hydration", function () {
    expect(hydration).to.be.an.instanceOf(Hydration);
  });
  it("should hold all hydration data", function () {
    expect(hydration.allHydrationData).to.equal(hydrationData);
  });
  it("should give hydration data for a specific user", function () {
    const user10 = [
      {
        userID: 10,
        date: "2019/06/15",
        numOunces: 75,
      },
      {
        userID: 10,
        date: "2019/06/16",
        numOunces: 68,
      },
      {
        userID: 10,
        date: "2019/06/17",
        numOunces: 49,
      },
      {
        userID: 10,
        date: "2019/06/18",
        numOunces: 97,
      },
      {
        userID: 10,
        date: "2019/06/19",
        numOunces: 38,
      },
      {
        userID: 10,
        date: "2019/06/20",
        numOunces: 78,
      },
      {
        userID: 10,
        date: "2019/06/21",
        numOunces: 95,
      },
      {
        userID: 10,
        date: "2019/06/22",
        numOunces: 72,
      },
    ];
    expect(hydration.filterHydrationByUser(10)).to.deep.equal(user10);
    hydration.filterHydrationByUser(10);
  });
  it("should give a user's hydration data for the latest date", function () {
    const today = {
      userID: 10,
      date: "2019/06/22",
      numOunces: 72,
    };
    expect(hydration.findTodaysHydration(10)).to.deep.equal(72);
  });
  it("should give the user's hydration data for the week", function () {
    const weeklyHydrations = {
      '2019/06/15': 75,
      '2019/06/16': 68,
      '2019/06/17': 49,
      '2019/06/18': 97,
      '2019/06/19': 38,
      '2019/06/20': 78,
      '2019/06/21': 95
    };
    expect(hydration.findWeeklyHydration("2019/06/15", 10)).to.deep.equal(
      weeklyHydrations
    );
  });
  it("should calculate a user's average hydration for all time", function () {
    expect(hydration.getAverageHydration(10)).to.equal(71.5);
  });
});
