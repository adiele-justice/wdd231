const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key
const city = 'YOUR_CITY_NAME'; // Replace with your chamber's city name
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// Function to fetch weather data
async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        
        // Current temperature
        const temperature = Math.round(data.main.temp);
        
        // Weather description with capitalized words
        const descriptions = data.weather.map(w => 
            w.description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        ).join(', ');

        // Update the weather section
        document.getElementById('temperature').innerText = `Current Temperature: ${temperature}°C`;
        document.getElementById('weather-description').innerText = `Weather: ${descriptions}`;

        // Forecast - assuming you have a 3-day forecast API call or data
        const forecast = await fetchForecast(); // Call to get the 3-day forecast
        displayForecast(forecast);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to fetch 3-day forecast data (replace with appropriate API if needed)
async function fetchForecast() {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(forecastUrl);
    const data = await response.json();
    return data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3); // Get daily data at noon
}

// Function to display 3-day temperature forecast
function displayForecast(forecast) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '<h3>3-Day Forecast</h3>';
    
    forecast.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        const temp = Math.round(item.main.temp);
        forecastDiv.innerHTML += `<p>${date}: ${temp}°C</p>`;
    });
}

// Sample JSON data for company spotlights
const companyData = [
    { name: "Gold Company A", logo: "logoA.png", phone: "123-456-7890", address: "123 Gold St", website: "http://exampleA.com", level: "Gold" },
    { name: "Silver Company B", logo: "logoB.png", phone: "987-654-3210", address: "456 Silver Ave", website: "http://exampleB.com", level: "Silver" },
    { name: "Gold Company C", logo: "logoC.png", phone: "555-123-4567", address: "789 Gold Blvd", website: "http://exampleC.com", level: "Gold" },
    { name: "Silver Company D", logo: "logoD.png", phone: "444-567-8901", address: "321 Silver Rd", website: "http://exampleD.com", level: "Silver" },
];

// Function to display company spotlights
function displaySpotlights() {
    const spotlightList = document.getElementById('spotlight-list');
    const selectedCompanies = companyData.filter(company => company.level === 'Gold' || company.level === 'Silver');
    const randomCompanies = selectedCompanies.sort(() => 0.5 - Math.random()).slice(0, 3);

    randomCompanies.forEach(company => {
        spotlightList.innerHTML += `
            <div class="spotlight">
                <h3>${company.name}</h3>
                <img src="images/${company.logo}" alt="${company.name} logo">
                <p>Phone: ${company.phone}</p>
                <p>Address: ${company.address}</p>
                <a href="${company.website}" target="_blank">Visit Website</a>
                <p>Membership Level: ${company.level}</p>
            </div>
        `;
    });
}

// Initialize the page
fetchWeather();
displaySpotlights();
