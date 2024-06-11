document.addEventListener('DOMContentLoaded', function() {
    fetchData();
    fetchWeather();
});

let currentJoke: { joke: string } | null = null;
let currentRating: number = 2;

interface WeatherData {
    current: {
        temp_c: number;
        condition: {
            icon: string;
        };
    };
}

async function fetchWeather(): Promise<WeatherData | void> {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=6a6de98fae9a4f1ba7d150520240506&q=Barcelona`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Could not fetch resource.');
        }
        const data: WeatherData = await response.json();
        const currentWeather = data.current;
        console.log(currentWeather.condition.icon);
        const weatherElement = document.getElementById('weather') as HTMLImageElement;
        weatherElement.src = `${currentWeather.condition.icon}`;
        const temperatureElement = document.getElementById('temperature') as HTMLElement;
        temperatureElement.innerText = `${currentWeather.temp_c}°C`;
        
        return data;
    } catch (error) {
        console.error(error);
    }
}

interface JokeData {
    joke: string;
}

async function fetchData(): Promise<JokeData[] | void> {
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/dadjokes?limit=', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'cvbmkiwL9sF06h7uKUpqyg==vdrKTlm0twoYOza3'
            }
        });

        if (!response.ok) {
            throw new Error('Could not fetch resource.');
        }
        const data: JokeData[] = await response.json();
        currentJoke = data[0];
        document.getElementById('joke')!.innerHTML = `${currentJoke.joke}`;
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function fetchOtherData(): Promise<JokeData[] | void> {
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/jokes?limit=', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'cvbmkiwL9sF06h7uKUpqyg==vdrKTlm0twoYOza3'
            }
        });

        if (!response.ok) {
            throw new Error('Could not fetch resource.');
        }
        const data: JokeData[] = await response.json();
        currentJoke = data[0];
        document.getElementById('joke')!.innerHTML = `${currentJoke.joke}`;
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function newJoke(): Promise<void> {
    if (currentJoke) {
        logJoke(currentJoke, currentRating);
        currentRating = 2;
    }
    const randomJoke = Math.floor(Math.random() * 2) + 1;
    if (randomJoke === 1) {
        await fetchData();
    } else {
        await fetchOtherData();
    }
}

let rateJoke = (rating: number): void => {
    currentRating = rating;
}

interface LogEntry {
    joke: string;
    score: number;
    date: string;
}

let reportAcudits: LogEntry[] = [];

let logJoke = (data: { joke: string }, jokeRating: number): void => {
    const newEntry: LogEntry = {
        joke: data.joke,
        score: jokeRating,
        date: new Date().toISOString().split('T')[0]
    };
    reportAcudits.push(newEntry);
    console.log(reportAcudits);
}
