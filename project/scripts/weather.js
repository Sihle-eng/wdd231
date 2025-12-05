// Cape Town Weather Script
const myTown = document.querySelector('#myTown');
const myDescription = document.querySelector('#myDescription');
const myTemperature = document.querySelector('#myTemperature');
const myGraphic = document.querySelector('#myGraphic');

const myKey = "ee6e6ef5516648a9411c2a935e8e7309";
const myLat = "-33.91667768301216";
const myLong = "18.436332844444856";

const myUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

async function fetchCapeTownWeather() {
    try {
        const response = await fetch(myUrl);
        if (response.ok) {
            const data = await response.json();
            displayCapeTownResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log('Cape Town weather error:', error);
    }
}

function displayCapeTownResults(data) {
    myTown.innerHTML = data.name;
    myDescription.innerHTML = data.weather[0].description;
    myTemperature.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    myGraphic.setAttribute('src', iconsrc);
    myGraphic.setAttribute('alt', data.weather[0].description);
}

fetchCapeTownWeather();


// Johannesburg Weather Script
const jhbTown = document.querySelector('#jhbTown');
const jhbDescription = document.querySelector('#jhbDescription');
const jhbTemperature = document.querySelector('#jhbTemperature');
const jhbGraphic = document.querySelector('#jhbGraphic');

const jhbKey = "ee6e6ef5516648a9411c2a935e8e7309";
const jhbLat = "-26.205564285407622";
const jhbLong = "28.035561354340288";

const jhbUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${jhbLat}&lon=${jhbLong}&appid=${jhbKey}&units=metric`;

async function fetchJohannesburgWeather() {
    try {
        const response = await fetch(jhbUrl);
        if (response.ok) {
            const data = await response.json();
            displayJohannesburgResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log('Johannesburg weather error:', error);
    }
}

function displayJohannesburgResults(data) {
    jhbTown.innerHTML = data.name;
    jhbDescription.innerHTML = data.weather[0].description;
    jhbTemperature.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    jhbGraphic.setAttribute('src', iconsrc);
    jhbGraphic.setAttribute('alt', data.weather[0].description);
}

fetchJohannesburgWeather();


// Pretoria Weather Script
const ptaTown = document.querySelector('#ptaTown');
const ptaDescrip = document.querySelector('#ptaDescription');
const ptaTemperature = document.querySelector('#ptaTemperature');
const ptaGraphic = document.querySelector('#ptaGraphic');

const ptaKey = "ee6e6ef5516648a9411c2a935e8e7309";
const ptaLat = "-25.751858815348516";
const ptaLong = "28.196579556533717";

const ptaUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${ptaLat}&lon=${ptaLong}&appid=${ptaKey}&units=metric`;

async function fetchPretoriaWeather() {
    try {
        const response = await fetch(ptaUrl);
        if (response.ok) {
            const data = await response.json();
            displayPretoriaResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log('Pretoria weather error:', error);
    }
}

function displayPretoriaResults(data) {
    ptaTown.innerHTML = data.name;
    ptaDescrip.innerHTML = data.weather[0].description;
    ptaTemperature.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    ptaGraphic.setAttribute('src', iconsrc);
    ptaGraphic.setAttribute('alt', data.weather[0].description);
}

fetchPretoriaWeather();


// Forecast Script (Cape Town)
const forecastDiv = document.querySelector('#forecast');
const forecastKey = "ee6e6ef5516648a9411c2a935e8e7309";
const forecastLat = "-33.91667768301216";
const forecastLong = "18.436332844444856";

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${forecastLat}&lon=${forecastLong}&appid=${forecastKey}&units=metric`;

async function fetchWeatherForecast() {
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
    const dailyForecasts = [];
    const processedDays = new Set();

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!processedDays.has(date) && dailyForecasts.length < 3) {
            processedDays.add(date);
            dailyForecasts.push(item);
        }
    });

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        const description = day.weather[0].description;
        const tempMax = day.main.temp_max;
        const tempMin = day.main.temp_min;

        forecastDiv.innerHTML += `
            <div class="forecast-day">
                <h3>${date}</h3>
                <img src="${icon}" alt="${description}">
                <p>${description}</p>
                <p>High: ${tempMax}&deg;C</p>
                <p>Low: ${tempMin}&deg;C</p>
            </div>
        `;
    });
}

fetchWeatherForecast();
