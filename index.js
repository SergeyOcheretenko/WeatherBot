import fetch from 'node-fetch';
import { Telegraf } from 'telegraf';
import config from './CONFIG.json';

const API_KEY = config.weather_api;
const BOT_TOKEN = config.bot_token;

const bot = new Telegraf(BOT_TOKEN);

function roundOneAfterPoint(number) {
    return Math.round(number * 10) / 10;
}

async function fetchWeather(city) {
    const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=ua&units=metric`);
    const data = await api_url.json();
    return data;
}

function getNeededInformation(weatherData) {
    const weatherDescription = weatherData.weather[0].description;
    const formattedDescription = weatherDescription[0].toUpperCase() + weatherDescription.slice(1,);
    const temperature = roundOneAfterPoint(weatherData.main.temp);
    return `${formattedDescription}, ${temperature}°C`;
}

bot.start(ctx => ctx.reply("Start")); // Later -> message from JSON messages template

bot.command('current_weather', async ctx => {
    const allWeatherData = await fetchWeather('Kiev');
    const neededInformation = await getNeededInformation(allWeatherData);
    await ctx.reply(neededInformation);
});

bot.launch();