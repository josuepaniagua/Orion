// linking to the enter button on home page
let enterButton = document.getElementById('enter-btn');
enterButton.addEventListener('click', handlingUserInput );

// Passes user text into the function
function handlingUserInput() {
    let city = document.getElementById("userInput").value;
    getCoordinates(city);
    changingWeatherBackground (weatherConditions);
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


//looks up weather for the city entered
function getCurrentWeather(lat, lon) {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&units=imperial&appid=9fa809658341d19670907599fff8fcdc';
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    // gets weather description
    .then(function (data) {
        // console.log(data.current.weather[0].main);
        let currentWeatherCondition = data.current.weather[0].main;
        console.log(currentWeatherCondition)

    });
}

const weatherConditions = ['Thunderstorm', 'Drizzle', 'Rain', 'Snow', 'Atmosphere', 'Clear', 'Clouds'];
// weatherConditions[0] = 
// weatherConditions[1] =
// weatherConditions[2] =
// weatherConditions[3] =
// weatherConditions[4] =
// weatherConditions[5] = 
// weatherConditions[6] =

function changingWeatherBackground (weatherConditions) {
    if (weatherConditions[0]){
        $('#game-fieldset').removeClass('clear-condition');
        $('#game-fieldset').addClass('thunderstorm-condition');
    };
    if (weatherConditions[1]){
        $('#game-fieldset').removeClass('clear-condition');
        $('#game-fieldset').addClass('drizzle-condition');
    };
    if (weatherConditions[2]){
        $('#game-fieldset').removeClass('clear-condition');
        $('#game-fieldset').addClass('rain-condition');
    };
    if (weatherConditions[3]){
        $('#game-fieldset').removeClass('clear-condition');
        $('#game-fieldset').addClass("snow-condition");
    };
    if (weatherConditions[4]){
        $('#game-fieldset').removeClass('clear-condition');
        $('#game-fieldset').addClass("atmosphere-condition");
    };
    if (weatherConditions[5]){
        $('#game-fieldset').removeClass('clear-condition');
        $('#game-fieldset').addClass("clear-condition");
    };
    if (weatherConditions[6]){
        $('#game-fieldset').removeClass('clear-condition');
        $('#game-fieldset').addClass("clouds-condition");
    };
}

//if it clear then this picture pops up, equal to css property that will change a background image
// you would need 7 different ids in the HTML and in CSS
// if weathercondition[0] then this id will appear else X7 to get this to be dynamic in JS
// setattr
// function change background will be in hand

// function displayClimate (currentWeatherCondition) {
//     console.log(currentWeatherCondition);

// }



//display weather icon
// function displayingCurrentIcon (){
//     document.getElementById('current-weather-icon').src="https://openweathermap.org/img/w/"+ currentIcon +".png"; 
//     currentIcon.textContent = currentIcon;
// }