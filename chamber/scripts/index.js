const weatherApiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const chamberLocation = 'YOUR_CITY,YOUR_COUNTRY'; // Replace with the chamber location

async function fetchWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${chamberLocation}&appid=${weatherApiKey}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const temperature = Math.round(data.main.temp);
    const description = capitalizeWords(data.weather.map(item => item.description).join(', '));
    document.getElementById('weather-info').innerText = `Current Temperature: ${temperature}°C - ${description}`;

    // Forecast can be fetched from a separate API endpoint if needed
    fetchForecast();
}

async function fetchForecast() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${chamberLocation}&appid=${weatherApiKey}&units=metric`);
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

function displayForecast(data) {
    const forecastList = document.getElementById('forecast');
    forecastList.innerHTML = ''; // Clear existing forecast

    for (let i = 0; i < 3; i++) { // Show 3-day forecast
        const day = data.list[i * 8]; // Getting forecast every 8 hours
        const temperature = Math.round(day.main.temp);
        const date = new Date(day.dt * 1000).toLocaleDateString();
        const description = capitalizeWords(day.weather.map(item => item.description).join(', '));
        
        const listItem = document.createElement('li');
        listItem.innerText = `${date}: ${temperature}°C - ${description}`;
        forecastList.appendChild(listItem);
    }
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        const qualifiedMembers = members.filter(member => member.membershipLevel > 1); // Silver and Gold
        displayMembers(qualifiedMembers);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

function displayMembers(members) {
    const membersContainer = document.getElementById('membersContainer');
    membersContainer.innerHTML = ''; // Clear existing content

    // Randomly select 2 or 3 members to display
    const selectedMembers = members.sort(() => 0.5 - Math.random()).slice(0, 3);

    selectedMembers.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p>Membership Level: ${member.membershipLevel}</p>
        `;
        membersContainer.appendChild(card);
    });
}

// Initialize the page
document.getElementById('current-year').innerText = new Date().getFullYear();
document.getElementById('last-modified').innerText = document.lastModified;

fetchWeather();
fetchMembers();
