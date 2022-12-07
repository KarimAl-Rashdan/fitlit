import { expect } from "chai";
const { hydrationData } = require("../src/data/hydration-data");
const {Hydration} = require("../src/Hydration");

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
        expect(hydration.id).to.equal(hydrationObj.id);
    });
    it("Should hold a date", () => {
        expect(hydration.date).to.equal(hydrationObj.date);
    });
    it("Should hold number of ounces drank by a user", () => {
        expect(hydration.numOunces).to.equal(hydrationObj.numOunces);
    });
})

