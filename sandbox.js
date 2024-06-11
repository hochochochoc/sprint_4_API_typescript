"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', function () {
    fetchData();
    fetchWeather();
});
let currentJoke = null;
let currentRating = 2;
function fetchWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://api.weatherapi.com/v1/current.json?key=6a6de98fae9a4f1ba7d150520240506&q=Barcelona`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Could not fetch resource.');
            }
            const data = yield response.json();
            const currentWeather = data.current;
            console.log(currentWeather.condition.icon);
            const weatherElement = document.getElementById('weather');
            weatherElement.src = `${currentWeather.condition.icon}`;
            const temperatureElement = document.getElementById('temperature');
            temperatureElement.innerText = `${currentWeather.temp_c}°C`;
            return data;
        }
        catch (error) {
            console.error(error);
        }
    });
}
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://api.api-ninjas.com/v1/dadjokes?limit=', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'cvbmkiwL9sF06h7uKUpqyg==vdrKTlm0twoYOza3'
                }
            });
            if (!response.ok) {
                throw new Error('Could not fetch resource.');
            }
            const data = yield response.json();
            currentJoke = data[0];
            document.getElementById('joke').innerHTML = `${currentJoke.joke}`;
            return data;
        }
        catch (error) {
            console.error(error);
        }
    });
}
function fetchOtherData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://api.api-ninjas.com/v1/jokes?limit=', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'cvbmkiwL9sF06h7uKUpqyg==vdrKTlm0twoYOza3'
                }
            });
            if (!response.ok) {
                throw new Error('Could not fetch resource.');
            }
            const data = yield response.json();
            currentJoke = data[0];
            document.getElementById('joke').innerHTML = `${currentJoke.joke}`;
            return data;
        }
        catch (error) {
            console.error(error);
        }
    });
}
function newJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentJoke) {
            logJoke(currentJoke, currentRating);
            currentRating = 2;
        }
        const randomJoke = Math.floor(Math.random() * 2) + 1;
        if (randomJoke === 1) {
            yield fetchData();
        }
        else {
            yield fetchOtherData();
        }
    });
}
let rateJoke = (rating) => {
    currentRating = rating;
};
let reportAcudits = [];
let logJoke = (data, jokeRating) => {
    const newEntry = {
        joke: data.joke,
        score: jokeRating,
        date: new Date().toISOString().split('T')[0]
    };
    reportAcudits.push(newEntry);
    console.log(reportAcudits);
};
