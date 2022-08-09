// linking to the enter button on home page
let enterButton = document.getElementById('enter-btn');
enterButton.addEventListener('click', handlingUserInput );

// Passes user text into the function
function handlingUserInput() {
    let city = document.getElementById("userInput").value;
    getCoordinates(city);
    changingWeatherBackground(weatherConditions);
}


// gets lon and lat values
async function getCoordinates(city) {
    let requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit=5&appid=9fa809658341d19670907599fff8fcdc';

    await fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let lat = data[0].lat;
        let lon = data[0].lon;
        getCurrentWeather(lat, lon);
    });
}


//looks up weather for the city entered
async function getCurrentWeather(lat, lon) {
    
    let requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&units=imperial&appid=9fa809658341d19670907599fff8fcdc';
    
    await fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    // gets weather description
    .then(function (data) {
        // console.log(data.current.weather[0].main);
        currentWeatherCondition = data.current.weather[0].main;
        console.log(currentWeatherCondition);
        changingWeatherBackground(currentWeatherCondition);
    });
}

// possible weather conditions
const weatherConditions = ['Thunderstorm', 'Drizzle', 'Rain', 'Snow', 'Atmosphere', 'Clear', 'Clouds'];

// selecting weather background
function changingWeatherBackground (currentWeatherCondition) {
    if (currentWeatherCondition == weatherConditions[0]){
        $('#game-fieldset').removeClass('clear-condition');
        $('#game-fieldset').addClass('thunderstorm-condition');
    }else if (currentWeatherCondition == weatherConditions[1]) {
        $('#game-fieldset').removeClass('clear-condition');
        $('#game-fieldset').addClass('drizzle-condition');
    } else if (currentWeatherCondition == weatherConditions[2]){
        $('#game-fieldset').removeClass('clear-condition');
        $('#game-fieldset').addClass('rain-condition');
    } else if (currentWeatherCondition == weatherConditions[3]){
        $('#game-fieldset').removeClass('clear-condition');
        $('#game-fieldset').addClass("snow-condition");
    } else if (currentWeatherCondition == weatherConditions[4]){
        $('#game-fieldset').removeClass('clear-condition');
        $('#game-fieldset').addClass("atmosphere-condition");
    } else if (currentWeatherCondition == weatherConditions[5]){
        $('#game-fieldset').removeClass('clear-condition');
        $('#game-fieldset').addClass("clear-condition");
    } else if (currentWeatherCondition == weatherConditions[6]){
        $('#game-fieldset').removeClass('clear-condition');
        $('#game-fieldset').addClass("clouds-condition");
    } else {
        return
    }
}
