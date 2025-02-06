document.getElementById("eco-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Capture user inputs
  const plasticWaste = document.getElementById("plastic-waste").value;
  const transportUsage = document.getElementById("transport-usage").value;
  const energyConsumption = document.getElementById("energy-consumption").value;
  const productType = document.getElementById("product-type").value;

  // Generate recommendations based on the input
  const recommendations = generateEcoRecommendations(plasticWaste, transportUsage, energyConsumption, productType);

  // Display the recommendations
  displayRecommendations(recommendations);
});

// Function to generate eco-friendly recommendations
function generateEcoRecommendations(plasticWaste, transportUsage, energyConsumption, productType) {
  let recommendations = '';

  // Plastic Waste Recommendations
  if (plasticWaste > 1) {
    recommendations += "<p>Reduce plastic waste by using reusable bags and bottles, and consider recycling more.</p>";
  } else {
    recommendations += "<p>Great! Keep minimizing plastic waste!</p>";
  }

  // Transport Usage Recommendations
  if (transportUsage > 10) {
    recommendations += "<p>Consider using public transport or carpooling to reduce your carbon footprint.</p>";
  } else {
    recommendations += "<p>Great job using less transport! Keep it up, or try walking or cycling more.</p>";
  }

  // Energy Consumption Recommendations
  if (energyConsumption > 5) {
    recommendations += "<p>Consider using energy-efficient appliances and turning off lights when not in use.</p>";
  } else {
    recommendations += "<p>Great! Keep using less energy to reduce your carbon footprint.</p>";
  }

  // Product Type Recommendations
  if (productType.includes('plastic')) {
    recommendations += "<p>Try switching to eco-friendly alternatives such as bamboo or glass products.</p>";
  } else {
    recommendations += "<p>You're already making eco-friendly choices by buying sustainable products!</p>";
  }

  return recommendations;
}

// Function to display recommendations on the webpage
function displayRecommendations(recommendations) {
  const recommendationsDiv = document.getElementById("eco-recommendations");
  recommendationsDiv.innerHTML = `
    <h2>Your Eco Recommendations:</h2>
    ${recommendations}
  `;
}
