class ActivityRepository {
  constructor(allActivityData) {
    this.activityData = allActivityData;
    this.currentUsersActivities = null;
  }
  filterById(currentUserId) {
    const usersActivities = this.activityData.filter(activity => activity.userID === currentUserId)
    return usersActivities
  }
}

export default ActivityRepository;