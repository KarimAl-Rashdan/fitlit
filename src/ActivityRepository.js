import User from "../src/User";

class ActivityRepository {
  constructor(allActivityData) {
    this.allActivityData = allActivityData;
  }
  filterById(userID) {
    return this.allActivityData.filter((data) => data.userID === userID);
  }
  findDaysExceededGoal(userID, currentUser) {
    const activityData = this.filterById(userID);
    return activityData.filter(activity => activity.numSteps > currentUser.dailyStepGoal);
  }
  findClimbingRecord(userID) {
    const userActivity = this.filterById(userID);
    const climbData = userActivity.map(activity => activity.flightsOfStairs);
    return Math.max(...climbData);
  }
  getUsersAvgForDay(date, key) {
    const dataForDay = this.allActivityData.filter(activity => activity.date === date);
    const totalForDay = dataForDay.reduce((total, activity) => {
      return total += activity[key];
    }, 0) / dataForDay.length;
    return Math.round(totalForDay)
  }
  findUserDataForToday(userID) {
   return this.filterById(userID).reverse()[0]
  }
}

export default ActivityRepository;
