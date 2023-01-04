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
  findMilesWalked(date, currentUser) {
    const findDate = this.currentUsersActivities.find((activity) => activity.date === date)
    const milesValue = findDate.numSteps * currentUser.strideLength
    const totalValue = milesValue/5280
    return Number(totalValue.toFixed(2))
  }
}

export default ActivityRepository;