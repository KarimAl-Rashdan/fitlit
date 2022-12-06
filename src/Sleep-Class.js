class Sleep {
  constructor(userSleepData) {
    this.sleepData = userSleepData;

  }
  calculateAverageSleep(type) {
    console.log('this.sleepData', this.sleepData)
    let total = this.sleepData.reduce((total, num) => {
      return total += num[type]
    }, 0)
    return Math.round(total/this.sleepData.length)
  }
}

export default Sleep;