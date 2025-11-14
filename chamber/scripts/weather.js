const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');

const myKey = "ee6e6ef5516648a9411c2a935e8e7309";
const myLat = "-26.326054489207984";
const myLong = "31.142506602517347";

const myUrl = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

async function fetchCurrentWeather() { // Renamed function
    try {
        const response = await fetch(myUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log('Current weather error:', error);
    }
}

function displayCurrentResults(data) {
    myTown.innerHTML = data.name;
    myDescription.innerHTML = data.weather[0].description;
    myTemperature.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    myGraphic.setAttribute('src', iconsrc); // Fixed: lowercase 'src'
    myGraphic.setAttribute('alt', data.weather[0].description);
}

fetchCurrentWeather(); // Updated function call

const forecastDiv = document.querySelector('#forecast');

const forecastKey = "ee6e6ef5516648a9411c2a935e8e7309";
const forecastLat = "-26.326054489207984";
const forecastLong = "31.142506602517347";

// Fixed API endpoint - using 2.5 instead of 3.0
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${forecastLat}&lon=${forecastLong}&appid=${forecastKey}&units=metric`;

async function fetchWeatherForecast() { // Renamed function
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecastResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log('Forecast error:', error);
    }
}

function displayForecastResults(data) {
    forecastDiv.innerHTML = "";

    // Group forecasts by day and get one reading per day
    const dailyForecasts = [];
    const processedDays = new Set();

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!processedDays.has(date) && dailyForecasts.length < 3) {
            processedDays.add(date);
            dailyForecasts.push(item);
        }
    });

    dailyForecasts.forEach((day, index) => {
        const date = new Date(day.dt * 1000).toDateString();
        const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        const description = day.weather[0].description;
        const tempMax = day.main.temp_max;
        const tempMin = day.main.temp_min;

        const forecastHTML = `     
            <div class="day-forecast">   
                <h3>${date}</h3>
                <img src="${icon}" alt="${description}">
                <p>${description}</p>
                <p>High: ${tempMax}&deg;C</p>
                <p>Low: ${tempMin}&deg;C</p>
            </div>
        `;
        forecastDiv.innerHTML += forecastHTML;
    });
}

fetchWeatherForecast(); // Updated function call