class SleepRepository {
  constructor(userSleepData) {
    this.sleepData = userSleepData;
  }

  filterSleepByUser(id) {
    let totalUserData = this.sleepData.filter(user => user.userID === id)
    return totalUserData
  }

  calculateAverageSleepPerDay(type, filterData, id) {
    let value = this.filterSleepByUser(id)
    let total = value.reduce((total, num) => {
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

  calculateSleepPerWeek(date, id) {
    let value = this.filterSleepByUser(id)
    let findentryDate = value.find(entry => entry.date === date);
    let startingIndex = value.indexOf(findentryDate);
    let selectedWeek = value.slice(startingIndex - 6, startingIndex + 1);
    let result = selectedWeek.map(entry => {
      let weeklySleep = {
        date: entry.date, 
        hoursSlept: entry.hoursSlept, 
        sleepQuality: entry.sleepQuality 
      }
      return weeklySleep
    })
    return result
  }

  calcAvgSleepStats(type) {
    let total = this.sleepData.reduce((total, num) => {
      return total += num[type];
    }, 0);
    return Math.round(total / this.sleepData.length);
  };
}

export default SleepRepository;