class HydrationRepository {
  constructor(allHydrationData) {
    this.allHydrationData = allHydrationData;
  }
  filterHydrationByUser(id) {
    const userHydroData = this.allHydrationData.filter(
      (user) => user.userID === id
    );
    return userHydroData;
  }
  findTodaysHydration(id) {
    const usersHydroData = this.filterHydrationByUser(id);
    const todaysData = usersHydroData.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
      
    });
    return todaysData[0].numOunces;
  }
  findWeeklyHydration(date, id) {
    const usersWeeklyData = this.filterHydrationByUser(id);
    const getIndexDate = usersWeeklyData.findIndex((user) => {
      return user.date === date;
    });
    const weeklyData = usersWeeklyData.slice(getIndexDate, getIndexDate + 7);
    return weeklyData;
  }
  getAverageHydration(id) {
    const allUserData = this.filterHydrationByUser(id);
    const usersAverage = allUserData.reduce((num, day) => {
      num += day.numOunces;
      return num;
    }, 0);
    return usersAverage / allUserData.length;
  }
}

export default HydrationRepository;

