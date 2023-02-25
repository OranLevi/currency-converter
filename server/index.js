const express = require("express");
const https = require('https');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

app.get("/getData/:from/:to", (req, res) => {
    const selectedCurrencyFrom = req.params.from;
    const selectedCurrencyTo = req.params.to;

    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${selectedCurrencyFrom}`;

    https.get(url, (httpsRes) => {
      let body = "";
      httpsRes.on("data", (chunk) => {
        body += chunk;
      });
      httpsRes.on("end", () => {
        try {
          let data = JSON.parse(body);
          console.log(data.conversion_rates[selectedCurrencyTo]);
          res.send(data);
        } catch (error) {
          console.error(error.message);
          res.status(500).send('Internal Server Error');
        };
      });
    }).on("error", (error) => {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    });
  });

app.listen(3001, () => {
    console.log("SERVER RUNS");
});