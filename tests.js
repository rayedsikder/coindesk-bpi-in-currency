const chai = window.chai;
const expect = chai.expect;

describe ("getBitcoinPriceForCurrency", () => {
    it("should return the BPI for the given currency", () => {
        const price = await getBitcoinPriceForCurrency("USD");
        console.log("Current BPI: " + price);
        assert(price != 0);
        )
    })
})