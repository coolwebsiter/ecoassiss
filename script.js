document.getElementById("eco-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Capture user inputs
  const plasticWaste = document.getElementById("plastic-waste").value;
  const transportUsage = document.getElementById("transport-usage").value;
  const energyConsumption = document.getElementById("energy-consumption").value;
  const productType = document.getElementById("product-type").value;

  // Debugging: Log the values to see if inputs are correct
  console.log('Inputs captured:', {plasticWaste, transportUsage, energyConsumption, productType});

  // Call the AI function to generate recommendations
  generateAiRecommendations(plasticWaste, transportUsage, energyConsumption, productType)
    .then((recommendations) => {
      // Display the recommendations
      displayRecommendations(recommendations);
    })
    .catch((error) => {
      console.error("Error generating recommendations:", error);
      displayRecommendations("Sorry, there was an issue generating recommendations. Please try again later.");
    });
});

// Function to generate AI recommendations using ChatGPT API
async function generateAiRecommendations(plasticWaste, transportUsage, energyConsumption, productType) {
  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'sk-svcacct-IPufWS-lQBzIa_kUrpyF8KocMnZIiQVSeNAxbV_ftWdX4bfkWcukWoebiexlT3BlbkFJgosum2FG3-7AFI0t8uaZIR4cyKQaBrBTT9csvY48ElTCGLSqp0N16YaUsQ0A' // Replace with your ChatGPT API key
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

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    // Check if AI gave any response
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No recommendations from AI');
    }

    return data.choices[0].text;
  } catch (error) {
    console.error('Error during API call:', error);
    return 'Sorry, there was an issue with the AI. Please try again later.';
  }
}

// Function to display recommendations on the webpage
function displayRecommendations(recommendations) {
  const recommendationsDiv = document.getElementById("eco-recommendations");
  recommendationsDiv.innerHTML = `
    <h2>Ваши рекомендации:</h2>
    <p>${recommendations}</p>
  `;
}
