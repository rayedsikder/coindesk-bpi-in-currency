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



router.get("/", (req, res) => {
    const currencyCode = req.body.currency;
    checkCurrencyParameter(currencyCode).then((message) => {
        console.log("Success" + message);
        res.send("data")
    }).catch((error) => {
        res.status(400);
        res.send("error: " + error.message)
    })
})

export default router;