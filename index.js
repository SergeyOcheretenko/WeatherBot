import fetch from 'node-fetch';
import config from './CONFIG.json' assert {type: "json"};

const API_KEY = config.weather_api;

async function fetchWeather(city) {
    const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=ua&units=metric`);
    const data = await api_url.json();
    console.log(data);
}

fetchWeather('Kiev');