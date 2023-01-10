import { expect } from 'chai';
import User from '../src/User';

describe("User", function() {
  let user;

  beforeEach(() => {
    user = new User({
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [
        16,
        4,
        8
      ]
    });
  });
  it('should be a function', function() {
  expect(User).to.be.a('function');
  });
  it('should initialize a User object', function() {
    expect(user.name).to.equal(user['name']);
    expect(user.friends[1]).to.equal(4);
  });
  it('should return the user/s first name', function() {
    expect(user.firstName()).to.be.equal('Luisa');
  });
});
