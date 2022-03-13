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

describe ("getMinMaxPrice", () => {
    it("should return the maximum BPI within last month", () => {
        const currency = "USD";
        cosnt priorDate = "2021-02-01";
        const currentDate = "2021-03-01";
        const data = await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${priorDate}&end=${currentDate}&currency=${currency}`);
        const jsonObj = await data.json();
        let bpiValues = [];
        for (const property in jsonObj.bpi) {
            bpiValues.push(jsonObj.bpi[property]);
        }
        const maxBPI = Math.max(...bpiValues);
        const functionMax = await getMinMaxPrice(currency);
        expect(functionMax[0].to.deep.equal(maxBPI));
    })

    it("should return the minimum BPI within last month", () => {
        const currency = "USD";
        cosnt priorDate = "2021-02-01";
        const currentDate = "2021-03-01";
        const data = await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${priorDate}&end=${currentDate}&currency=${currency}`);
        const jsonObj = await data.json();
        let bpiValues = [];
        for (const property in jsonObj.bpi) {
            bpiValues.push(jsonObj.bpi[property]);
        }
        const minBPI = Math.max(...bpiValues);
        const functionMin = await getMinMaxPrice(currency);
        expect(functionMin[1].to.deep.equal(minBPI));
    })    
})