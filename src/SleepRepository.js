class SleepRepository {
  constructor(userSleepData) {
    this.sleepData = userSleepData;
  }
  filterSleepByUser(id) {
    let totalUserData = this.sleepData.filter(user => user.userID === id);
    return totalUserData;
  }
  findTodaysData(id) {
    const usersSleepData = this.filterSleepByUser(id).sort((a,b) => new Date(b.date)- new Date(a.date))
    return usersSleepData[0]
    
  }
  calculateAverageSleepPerDay(type, filterData, id) {
    let value = this.filterSleepByUser(id);
    let total = value.reduce((total, num) => {
      return total += num[type];
    }, 0);
    return Math.round(total/filterData.length);
  }
  calculateSleepByDate(date, type, id) {
    if(date) {
      let value = this.filterSleepByUser(id);
      let dataByDate = value
        .filter(user => user.date === date)
        .map(user => user[type]);
      return dataByDate;
    } else {
      return 'Pick a date';
    }
  }
  findWeeklyData(date, id) {
    const userSleepInfo = this.filterSleepByUser(id)
    const lastIndex = userSleepInfo.findIndex((user) => user.date === date);
    const todayIndex = lastIndex + 1
    const firstIndex = lastIndex - 6
    const weeklySleep = userSleepInfo.slice(firstIndex,todayIndex);
    return weeklySleep;
  }
  calculateAvgSleepPerWeek(date, id, type) {
    let value = this.filterSleepByUser(id);
    let findentryDate = value.find(entry => entry.date === date);
    let startingIndex = value.indexOf(findentryDate);
    let selectedWeek = value.slice(startingIndex - 6, startingIndex + 1);
    const result = selectedWeek.reduce((num, day) => {
      num += day[type]
      return num
    }, 0)/selectedWeek.length
    
    return Math.round(result)
  }
  calcAvgSleepStats(type) {
    let total = this.sleepData.reduce((total, num) => {
      return total += num[type];
    }, 0);
    return Math.round(total / this.sleepData.length);
  }
}

export default SleepRepository;