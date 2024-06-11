document.addEventListener('DOMContentLoaded', function() {
    fetchData();
    fetchWeather();
});

let currentJoke = null;
let currentRating = 2;

async function fetchWeather(){
    try{
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=6a6de98fae9a4f1ba7d150520240506&q=Barcelona`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if(!response.ok){
            throw new Error('Could not fetch resource.');
        }
        const data = await response.json();
        currentWeather = data.current;
        console.log(currentWeather.condition.icon);
        document.getElementById('weather').src = `${currentWeather.condition.icon}`;
        document.getElementById('temperature').innerText = `${currentWeather.temp_c}°C`;
        return data;
    }
    catch(error){
        console.error(error);
    }
}

async function fetchData(){
    try{
        
        const response = await fetch('https://api.api-ninjas.com/v1/dadjokes?limit=', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'cvbmkiwL9sF06h7uKUpqyg==vdrKTlm0twoYOza3'
            }
        });
        
        if(!response.ok){
            throw new Error('Could not fetch resource.');
        }
        const data = await response.json();
        currentJoke = data[0];
        document.getElementById('joke').innerHTML = `${currentJoke.joke}`;
        return data;
    }
    catch(error){
        console.error(error);
    }
}

async function fetchOtherData(){
    try{
        
        const response = await fetch('https://api.api-ninjas.com/v1/jokes?limit=', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'cvbmkiwL9sF06h7uKUpqyg==vdrKTlm0twoYOza3'
            }
        });
        
        if(!response.ok){
            throw new Error('Could not fetch resource.');
        }
        const data = await response.json();
        currentJoke = data[0];
        document.getElementById('joke').innerHTML = `${currentJoke.joke}`;
        return data;
    }
    catch(error){
        console.error(error);
    }
}



async function newJoke () {
    if (currentJoke) {
        logJoke(currentJoke, currentRating);
        currentRating = 2;
    }
    let randomJoke = Math.floor(Math.random() * 2) + 1;
    if (randomJoke == 1) {
        await fetchData();
    } else {
        await fetchOtherData();
    }
    
}

let rateJoke = (rating) => {
    currentRating = rating;
}

let reportAcudits = [];

let logJoke = (data, jokeRating) => {
    

    let newEntry = {
        joke: data.joke,
        score: jokeRating,
        date: new Date().toISOString().split('T')[0]
    }
    reportAcudits.push(newEntry);
    console.log(reportAcudits);
}
