import express from "express";
import moment from "moment";
import fetch from "node-fetch";

const router = express.Router();

const currentDate = moment();
const priorDate = moment().subtract(30, "days");

function checkCurrencyParameter(currencyCode) {
    return new Promise((resolve, reject) => {
        if(currencyCode === "" || undefined) {
            reject({
                message: "Undefined or null parameters"
            })
        }
        else if(currencyCode.toUpperCase() === "USD") {
            resolve({
                message: "Success!"
            })
        }
        else if(currencyCode.toUpperCase() === "EUR") {
            resolve({
                message: "Success!"
            })
        }
        else if(currencyCode.toUpperCase() === "GBP") {
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

async function getBitcoinPriceForCurrency(currencyCode) {
    const data = await fetch(`https://api.coindesk.com/v1/bpi/currentprice/${currencyCode}.json`)
    const jsonObj = await data.json();
    const rateFloat = jsonObj.bpi[currencyCode.toUpperCase()].rate_float;
    //console.log(jsonObj);
    return rateFloat;
}

async function getMinMaxPrice(currencyCode) {
    const data = await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${priorDate.format("YYYY-MM-DD")}&end=${currentDate.format("YYYY-MM-DD")}&currency=${currencyCode}`);
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
    const { currencyCode } = req.query;
    //console.log(currencyCode);

    checkCurrencyParameter(currencyCode).then(async (message) => {
        const price = await getBitcoinPriceForCurrency(currencyCode);
        const maxMinPrice = await getMinMaxPrice(currencyCode);
        const responseData = {
            currency: currencyCode.toUpperCase(),
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