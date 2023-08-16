import express from 'express';

import longestWord from './bootcamp/longestWord.js';
import shortestWord from './bootcamp/shortestWord.js';
import wordLengths from './bootcamp/wordLengths.js';
import totalPhoneBill from './bootcamp/totalPhoneBill.js';
import enoughAirtime from './bootcamp/enoughAirtime.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/api/word_game', function (req, res) {

  const sentence = req.query.sentence;
  if (!sentence) {
    res.json({
      error: 'Please send in a sentence to analyse'
    })

  }

  res.json({
    "longestWord": longestWord(sentence),
    "shortestWord": shortestWord(sentence),
    "sum": wordLengths(sentence)
  });

});

let callPrice = 2.75;
let smsPrice = 0.65;

let prices = {
  sms: 0.65,
  call: 2.75
}

app.get("/api/phonebill/prices", (req, res) => {
  res.json({
    prices
  });
});

app.post('/api/phonebill/update/prices', async (req, res) => {
  const { type, updatedCost } = req.body;
  let message = '';
  if (prices[type] !== undefined) {
    prices[type] = Number(updatedCost);
    message = `Successfully updated ${type}`
  } else {
    message = `Type ${type} is not valid`
  }
  console.log(prices);
  res.json({
    message,
    prices
  })
})

app.post("/api/phonebill/price", (req, res) => {

  const { type, price } = req.body;
  if (type === "call") {
    callPrice = price;
  } else if (type === "sms") {
    smsPrice = price;
  }
  res.json({
    status: "sucess",
    message: `The ${type} was set to ${price}`,
  });
});

app.post("/api/phonebill/total", (req, res) => {

  const data = req.body.bill;
  const total = totalPhoneBill(data, prices);

  res.json({
    total,
  });
});

app.post("/api/enough", (req, res) => {

  const { usage, available } = req.body;
  const result = enoughAirtime(usage, available);

  res.json({
    result,
  });

});


const PORT = 6007;
app.listen(PORT, function () {
  console.log('api started on port ', PORT)
})
