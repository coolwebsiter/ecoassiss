document.getElementById("eco-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  // Capture user inputs
  const plasticWaste = document.getElementById("plastic-waste").value;
  const transportUsage = document.getElementById("transport-usage").value;
  const energyConsumption = document.getElementById("energy-consumption").value;
  const productType = document.getElementById("product-type").value;

  // Call the AI function to generate recommendations
  generateAiRecommendations(plasticWaste, transportUsage, energyConsumption, productType)
    .then((recommendations) => {
      // Display the recommendations
      displayRecommendations(recommendations);
    })
    .catch((error) => {
      console.error("Error generating recommendations:", error);
    });
});

// Function to generate AI recommendations using ChatGPT API
async function generateAiRecommendations(plasticWaste, transportUsage, energyConsumption, productType) {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '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' // Replace with your ChatGPT API key
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', // You can use the latest model or another model you prefer
      prompt: `Provide personalized recommendations for reducing waste, energy consumption, and promoting eco-friendly products based on the following user inputs:
        Plastic waste per day: ${plasticWaste} kg,
        Transport usage per week: ${transportUsage} times,
        Energy consumption per day: ${energyConsumption} kWh,
        Common products purchased: ${productType}`,
      max_tokens: 150
    })
  });
  
  const data = await response.json();
  return data.choices[0].text;
}

// Function to display recommendations on the webpage
function displayRecommendations(recommendations) {
  const recommendationsDiv = document.getElementById("eco-recommendations");
  recommendationsDiv.innerHTML = `
    <h2>Ваши рекомендации:</h2>
    <p>${recommendations}</p>
  `;
}
