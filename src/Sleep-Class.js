class Sleep {
  constructor(userSleepData) {
    this.sleepData = userSleepData;
  }
  filterSleepByUser(id) {
    let totalUserData = this.sleepData.filter(user => user.userID === id)
    return totalUserData
  }

  calculateAverageSleepPerDay(type, filterData, id) {
    let value = this.filterSleepByUser(id)
    let total = filterData.reduce((total, num) => {
      return total += num[type]
    }, 0)
    return Math.round(total/filterData.length)
  }

  calculateSleepByDate(date, type, id) {
    let value = this.filterSleepByUser(id)
    let dataByDate = value
    .filter(user => user.date === date)
    .map(user => user[type])
    return dataByDate
  }
}
export default Sleep;