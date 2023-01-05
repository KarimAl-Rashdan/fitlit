import { expect } from 'chai';
import Activity from '../src/Activity';

describe('Activity', () => {
    let activityData, activity;

    beforeEach(() => {
        activityData = {
            userID: 1,
            date: "2019/06/15",
            numSteps: 3577,
            minutesActive: 140,
            flightsOfStairs: 16
            };
        activity = new Activity(activityData);
    })

    it('should be a function', () => {
       expect(Activity).to.be.a('function');
    });
    it('should be an instance of Activity', () => {
        expect(activity).to.be.an.instanceOf(Activity);
    });
    it('should hold the user id', () => {
        expect(activity.userID).to.equal(1);
    });
    it('should hold the date', () => {
        expect(activity.date).to.equal("2019/06/15");
    });
    it('should hold the number of steps', () => {
        expect(activity.numSteps).to.equal(3577);
    });
    it('should hold the number of minutes active', () => {
        expect(activity.minutesActive).to.equal(140);
    });
    it('should hold the number of stairs climbed', () => {
        expect(activity.flightsOfStairs).to.equal(16);
    });
});