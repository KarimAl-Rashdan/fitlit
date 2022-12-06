import { expect } from 'chai';
import User from '../src/User-Class';

describe("User", () => {
  it('should be a function', function() {
  expect(User).to.be.a('function')
  })

  const userData = {
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
  }
  it('should initialize a User object', function() {
    const user = new User(userData)
    expect(user.name).to.equal(userData['name'])
    expect(user.friends[1]).to.equal(4)
  })

  it('should return the user/s first name', function() {
    const user = new User(userData)
    expect(user.firstName()).to.be.equal('Luisa')
  })
})
