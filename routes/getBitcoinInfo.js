import express from "express";
import moment from "moment";
import fetch from "node-fetch";

const router = express.Router();

const currentDate = moment();
const priorDate = moment().subtract(30, "days");

function checkCurrencyParameter(currency) {
    return new Promise((resolve, reject) => {
        if(currency === "" || undefined) {
            reject({
                message: "Undefined or null parameters"
            })
        }
        else if(currency.toUpperCase() === "USD") {
            resolve({
                message: "Success!"
            })
        }
        else if(currency.toUpperCase() === "EUR") {
            resolve({
                message: "Success!"
            })
        }
        else if(currency.toUpperCase() === "GBP") {
            resolve({
                message: "Success!"
            })
        }                
        else {
            reject({
                message: "Unsupported or invalid currency code"
            })
        }
    })
}

async function getBitcoinPriceForCurrency(currency) {
    const data = await fetch(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`)
    const jsonObj = await data.json();
    const rateFloat = jsonObj.bpi[currency.toUpperCase()].rate_float;
    //console.log(jsonObj);
    return rateFloat;
}

async function getMinMaxPrice(currency) {
    const data = await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${priorDate.format("YYYY-MM-DD")}&end=${currentDate.format("YYYY-MM-DD")}&currency=${currency}`);
    const jsonObj = await data.json();
    let bpiValues = [];
    for (const property in jsonObj.bpi) {
        bpiValues.push(jsonObj.bpi[property]);
      }
    const maxBPI = Math.max(...bpiValues);
    const minBPI = Math.min(...bpiValues);
    
    return [maxBPI, minBPI];
}

router.get("/", (req, res) => {
    const { currency } = req.query;

    checkCurrencyParameter(currency).then(async (message) => {
        const price = await getBitcoinPriceForCurrency(currency);
        const maxMinPrice = await getMinMaxPrice(currency);
        const responseData = {
            currency: currency.toUpperCase(),
            bpi: price,
            maximumBPI: maxMinPrice[0],
            minimumBPI: maxMinPrice[1]
        }
        //console.log("Success" + message);
        res.send(responseData);
    }).catch((error) => {
        res.status(400);
        res.send("error: " + error.message)
    })
})

export default router;