import { expect } from 'chai';
import Sleep from '../src/Sleep';


describe('Sleep', () => {
  let sleepData, sleep;

  beforeEach(() => {
    sleepData = {
      "userID": 2,
      "date": '2019/06/15',
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    };
    sleep = new Sleep(sleepData);
  });

  it('should be a function', () => {
    expect(Sleep).to.be.a('function');
  });
  it('should be an instance of Sleep', () => {
    expect(sleep).to.be.an.instanceof(Sleep);
    expect(sleep.userID).to.equal(2);
    expect(sleep.date).to.equal('2019/06/15');
    expect(sleep.hoursSlept).to.equal(6.1);
    expect(sleep.sleepQuality).to.equal(2.2);
  });
});