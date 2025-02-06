const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/eco-recommendations', async (req, res) => {
  const { plasticWaste, transportUsage, energyConsumption, productType } = req.body;

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `sk-svcacct-IPufWS-lQBzIa_kUrpyF8KocMnZIiQVSeNAxbV_ftWdX4bfkWcukWoebiexlT3BlbkFJgosum2FG3-7AFI0t8uaZIR4cyKQaBrBTT9csvY48ElTCGLSqp0N16YaUsQ0A`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      prompt: `Provide personalized recommendations for reducing waste, energy consumption, and promoting eco-friendly products based on the following user inputs: Plastic waste per day: ${plasticWaste} kg, Transport usage per week: ${transportUsage} times, Energy consumption per day: ${energyConsumption} kWh, Common products purchased: ${productType}`,
      max_tokens: 150
    })
  });

  const data = await response.json();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
