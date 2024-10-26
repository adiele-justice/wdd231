// Weather API
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const city = 'YOUR_CITY'; // Replace with your city
const weatherSection = document.getElementById('weather-info');
const forecastList = document.getElementById('forecast');

async function fetchWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    
    const temp = Math.round(data.main.temp);
    const weatherDescription = data.weather.map(item => item.description.charAt(0).toUpperCase() + item.description.slice(1)).join(', ');
    
    weatherSection.innerHTML = `Current Temperature: ${temp}°C<br>Description: ${weatherDescription}`;
    
    fetchForecast();
}

async function fetchForecast() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    const forecastDays = data.list.filter((item, index) => index % 8 === 0).slice(0, 3); // 3-day forecast

    forecastList.innerHTML = forecastDays.map(item => {
        const temp = Math.round(item.main.temp);
        return `<li>${new Date(item.dt * 1000).toLocaleDateString()}: ${temp}°C</li>`;
    }).join('');
}

// Fetch members
async function fetchMembers() {
    const response = await fetch('data/members.json'); // Ensure this path is correct
    const members = await response.json();
    const spotlights = members.filter(member => member.membership === 'Gold' || member.membership === 'Silver');
    const selectedSpotlights = spotlights.sort(() => 0.5 - Math.random()).slice(0, 3);

    const spotlightContent = selectedSpotlights.map(member => `
        <div class="spotlight">
            <h3>${member.companyName}</h3>
            <img src="${member.logo}" alt="${member.companyName} Logo">
            <p>Phone: ${member.phone}</p>
            <p>Address: ${member.address}</p>
            <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p>Membership Level: ${member.membership}</p>
        </div>
    `).join('');

    document.getElementById('spotlight-content').innerHTML = spotlightContent;
}

// Call the functions to fetch weather and members
fetchWeather();
fetchMembers();
