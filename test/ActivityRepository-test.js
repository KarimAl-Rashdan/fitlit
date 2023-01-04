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
  });

})