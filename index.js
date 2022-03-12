import "dotenv/config"
import express from "express";
import bodyParser from "body-parser";

import currencyRoutes from "./routes/getBitcoinInfo.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/getBitcoinInfo", currencyRoutes);

app.get("/", (req, res) => {
    res.send("Hello from Homepage");
})

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});