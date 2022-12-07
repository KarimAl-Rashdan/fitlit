import { EntryOptionPlugin } from "webpack";

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

  // calculateSleepPerWeek(date) {
  //   let findentryDate = this.sleepData.find(entry => entry.date === date);
  //   let startingIndex = this.sleepData.indexOf(findentryDate);
  //   let selectedWeek = this.sleepData.slice(startingIndex - 6, startingIndex + 1);
  //   let result = selectedWeek.map(entry => {
  //     let weeklySleep = {
  //       date: entry.date,
  //       hours: entry.hoursSlept,
  //       quality: entry.sleepQuality,
  //     };
  //     return weeklySleep
  //   })
  //   return result

  // }
}
export default Sleep;