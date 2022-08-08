// In HTML we need this to go some where



let enterButton = document.getElementById('enter-btn');
enterButton.addEventListener('click', handlingUserInput );

function handlingUserInput() {
    let city = document.getElementById("userInput").value;
    getCoordinates(city);
}


// gets lon and lat values
function getCoordinates(city) {
    let requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit=5&appid=9fa809658341d19670907599fff8fcdc';

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let lat = data[0].lat;
        let lon = data[0].lon;
        getCurrentWeather(lat, lon);
    });
}


//Weather API 
function getCurrentWeather(lat, lon) {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&units=imperial&appid=9fa809658341d19670907599fff8fcdc';
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data.current.weather[0].main);
        let currentWeatherCondition = data.current.weather[0].main;
        displayClimate(currentWeatherCondition);
    });
}

const weatherConditions = ['Thunderstorm', 'Drizzle', 'Rain', 'Snow', 'Atmosphere', 'Clear', 'Clouds'];

function displayClimate (currentWeatherCondition) {
    console.log(currentWeatherCondition);
}

//display weather icon
// function displayingCurrentIcon (){
//     document.getElementById('current-weather-icon').src="https://openweathermap.org/img/w/"+ currentIcon +".png"; 
//     currentIcon.textContent = currentIcon;
// }