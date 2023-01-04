class ActivityRepository {
  constructor(allActivityData) {
    this.activityData = allActivityData;
    this.currentUsersActivities = null;
  }
  filterById(currentUserId) {
    const usersActivities = this.activityData.filter(activity => activity.userID === currentUserId)
    this.currentUsersActivities = usersActivities
    return usersActivities
  }
  findDate(date) {
    const getDay = this.currentUsersActivities.find((activity) => activity.date === date) 
    return getDay
  }
  findMilesWalked(date, currentUser) {
    if(!date) {
      return 'Please pick a date!'
    } else {
      const specifiedDate = this.findDate(date)
      const milesValue = specifiedDate.numSteps * currentUser.strideLength
      const totalValue = milesValue/5280
      return Number(totalValue.toFixed(2))
    }
  }
  findActiveMinOnDay(date) {
    if(!date) {
      return 'Please pick a date!'
    } else {
      const specifiedDate = this.findDate(date)
      return specifiedDate.minutesActive
    }
  }
  findAvgMinGivenWeek(date) {
    const findIndex = this.currentUsersActivities.findIndex((activity) => activity.date === date)
    const weeklyActivity = this.currentUsersActivities.slice(findIndex, findIndex + 7)
    const weeklyAvg = weeklyActivity.reduce((num, day) => {
      num += day.minutesActive
      return num
    }, 0)/weeklyActivity.length
    return Math.trunc(weeklyAvg)
  }
}

export default ActivityRepository;