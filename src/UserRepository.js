import User from "../src/User-Class";

class UserRepository {
	constructor(allUserData) {
		this.allUsers = allUserData;
		this.currentUser;
	}
	findUser(id) {
		const user = this.allUsers.find(user => {
			return user.id === id
		});
		this.currentUser = new User(user);
		return user;
	}
	calculateAverageStepGoal() {
		const averageStepGoal = this.allUsers.reduce((total, user) => {
			total += user.dailyStepGoal
		return total
		}, 0) / this.allUsers.length
		return averageStepGoal
	}
}

export default UserRepository;