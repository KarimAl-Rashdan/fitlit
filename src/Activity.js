class Activity {
    constructor(activityData) {
        this.userID = activityData.userID;
        this.date = activityData.date;
        this.numSteps = activityData.numSteps;
        this.minutesActive = activityData.minutesActive;
        this.flightsOfStairs = activityData.flightsOfStairs;
    }
}


export default Activity;