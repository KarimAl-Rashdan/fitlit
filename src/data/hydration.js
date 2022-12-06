class Hydration {
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
    return todaysData[0];
  }
  findWeeklyHydration(date, id) {
    const usersWeeklyData = this.filterHydrationByUser(id);
    const getIndexDate = usersWeeklyData.findIndex((user) => {
      return new Date(user.date) === new Date(date);
    });
    return usersWeeklyData.slice(getIndexDate, getIndexDate+8)
  }
}
module.exports = { Hydration };
