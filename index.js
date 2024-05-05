const calculateButton = document.getElementById('calculate-button');
const footprintResult = document.getElementById('footprint-result');

calculateButton.addEventListener('click', () => {
  let totalFootprint = 0;
  let calculatedCategories = [];
  let missingCategories = [];

  // Transportation
  const carMileage = parseFloat(document.getElementById('car-mileage').value);
  const dailyCommute = parseFloat(document.getElementById('daily-commute').value);
  const commuteFrequency = parseFloat(document.getElementById('commute-frequency').value);
  const engineCapacity = document.getElementById('engine-capacity').value; // Assuming this element exists

  if (!isNaN(carMileage) && !isNaN(dailyCommute) && !isNaN(commuteFrequency)) {
    let emissionFactor;
    if (engineCapacity === 'lessThan1500') {
      emissionFactor = 0.115;
    } else if (engineCapacity === 'moreThan1500') {
      emissionFactor = 0.23;
    } else {
      emissionFactor = 0.03833; // Assuming scooty/bike by default
    }
    const annualDistance = dailyCommute * commuteFrequency * 52;
    totalFootprint += emissionFactor * annualDistance / carMileage;
    calculatedCategories.push("Transportation");
  } else {
    missingCategories.push("Transportation");
  }

  // Energy
  const electricityUsage = parseFloat(document.getElementById('electricity-usage').value);
  const gasUsage = parseFloat(document.getElementById('gas-usage').value);
  if (!isNaN(electricityUsage) || !isNaN(gasUsage)) {
    totalFootprint += calculateEnergyFootprint(electricityUsage, gasUsage);
    calculatedCategories.push("Energy");
  } else {
    missingCategories.push("Energy");
  }

  // Other
  const flights = parseFloat(document.getElementById('flights').value);
  const meatConsumption = parseFloat(document.getElementById('meat-consumption').value);
  if (!isNaN(flights) || !isNaN(meatConsumption)) {
    totalFootprint += calculateOtherFootprint(flights, meatConsumption);
    calculatedCategories.push("Other");
  } else {
    missingCategories.push("Other");
  }

  // Oxygen produced by trees
  const treesPlanted = parseFloat(document.getElementById('trees-planted').value);
  if (!isNaN(treesPlanted)) {
    totalFootprint -= treesPlanted * 120; // Oxygen produced by trees
  }

  // Display result
  if (missingCategories.length > 0) {
    footprintResult.textContent = `Footprint calculated for: ${calculatedCategories.length === 1 ? calculatedCategories[0] : calculatedCategories.join(', ')}. Total footprint: ${totalFootprint.toFixed(2)} kg CO2e`;
  } else {
    footprintResult.textContent = `Your estimated carbon footprint is: ${totalFootprint.toFixed(2)} kg CO2e`;
  }
});

function calculateEnergyFootprint(electricity, gas) {
  const electricityFactor = 0.82; // Emission factor for electricity
  const gasFactor = 5.615; // Emission factor for gas
  return electricity * electricityFactor + gas * gasFactor;
}

function calculateOtherFootprint(flights, meat) {
  const flightFactor = 1540; // Emission factor for flights
  const meatFactor = 27; // Emission factor for meat
  return flights * flightFactor + meat * meatFactor * 52;
}
