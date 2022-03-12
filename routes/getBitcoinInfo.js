import express from "express";
import moment from "moment";


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
        else if(currencyCode.toUpperCase() === ("USD" || "GBR" || "EUR")) {
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

function getBitcoinPriceForCurrency(currencyCode) {
    const data = fetch(`https://api.coindesk.com/v1/bpi/currentprice/${currencyCode}.json`)
    const jsonObj = data.json("")
    const rateFloat = jsonObj.bpi[currencyCode.toUpperCase()].rate_float;
    return rateFloat;
}

function getMinMaxPrice(currencyCode) {
    const data = fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${currentDate.format("YYYY-MM-DD")}&end=${priorDate.format("YYYY-MM-DD")}&currency=${currencyCode}`);
    const jsonObj = data.json();
    let bpiValues = [];
    for (const property in jsonObj.bpi) {
        bpiValues.push(jsonObj.bpi[property]);
      }
    const maxBPI = Math.max(...bpiValues);
    const minBPI = Math.min(...bpiValues);
    return maxBPI, minBPI;
}

router.get("/", (req, res) => {
    const currencyCode = req.body;
    checkCurrencyParameter(currencyCode).then((message) => {
        const price = getBitcoinPriceForCurrency(currencyCode);
        const maxMinPrice = getMinMaxPrice(currencyCode);
        const responseData = {
            currency: currencyCode.toUpperCase(),
            bpi: price,
            maximumBPI: maxMinPrice[0],
            minimumBPI: maxMinPrice[1]
        }
        console.log("Success" + message);
        res.send(responseData);
    }).catch((error) => {
        res.status(400);
        res.send("error: " + error.message)
    })
})

export default router;