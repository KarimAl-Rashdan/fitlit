import { expect } from "chai";
const { hydrationData } = require("../src/data/hydration-data");
import Hydration from "../src/Hydration";

describe('Hydration Class', () => {
    let hydration;
    let hydrationObj;
    beforeEach(() => {
        hydrationObj = hydrationData[0]
        hydration = new Hydration(hydrationObj)
        
    });
    it("Should be a function", () => {
        expect(Hydration).to.be.a("function");
    });
    it("Should be an instance of Hydration", () => {
        expect(hydration).to.be.an.instanceOf(Hydration);
    });
    it("Should hold a user Id", () => {
        expect(hydration.userID).to.equal(10);
    });
    it("Should hold a date", () => {
        expect(hydration.date).to.equal('2019/06/15');
    });
    it("Should hold number of ounces drank by a user", () => {
        expect(hydration.numOunces).to.equal(75);
    });
})

