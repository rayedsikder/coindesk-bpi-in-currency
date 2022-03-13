const chai = window.chai;
const expect = chai.expect;
import fetch from "node-fetch";

describe ("getBitcoinPriceForCurrency", () => {
    it("should return the BPI for the USD", () => {
        const currency = "USD";
        console.log("Current BPI: " + price);
        const data = await fetch(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`)
        const jsonObj = await data.json();
        const rateFloat = jsonObj.bpi[currency.toUpperCase()].rate_float;
        expect(getBitcoinPriceForCurrency(currency).to.deep.equal(rateFloat));
    })

    it("should return the BPI for the GBP", () => {
        const currency = "GBP";
        const data = await fetch(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`)
        const jsonObj = await data.json();
        const rateFloat = jsonObj.bpi[currency.toUpperCase()].rate_float;
        expect(getBitcoinPriceForCurrency(currency).to.deep.equal(rateFloat));
    })

    it("should return the BPI for the EUR", () => {
        const currency = "EUR";
        const data = await fetch(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`)
        const jsonObj = await data.json();
        const rateFloat = jsonObj.bpi[currency.toUpperCase()].rate_float;
        expect(getBitcoinPriceForCurrency(currency).to.deep.equal(rateFloat));
    })    


    it("should throw error when parameters are empty", () => {
        const currency = "";
        const data = await fetch(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`)
        assert(1);
    })      

})

