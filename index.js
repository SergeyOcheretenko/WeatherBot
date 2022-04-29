import fetch from 'node-fetch';
import { Telegraf } from 'telegraf';
import config from './CONFIG.json';

const API_KEY = config.weather_api;
const BOT_TOKEN = config.bot_token;

const bot = new Telegraf(BOT_TOKEN);

async function fetchWeather(city) {
    const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=ua&units=metric`);
    const data = await api_url.json();
    console.log(data);
}

bot.start(ctx => ctx.reply("I'm working"));

bot.launch();