// In HTML we need this to go some where



const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handlingUserInput );

function handlingUserInput() {
    let city = document.getElementById("userInput").value;
    getCoordinates(city);
    displayName(city);
    cityListPopulate(city);
    var searchHistory = JSON.parse(localStorage.getItem("city")) || []
    searchHistory.push(city)
    localStorage.setItem("city", JSON.stringify(searchHistory)) 
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

        //grabs icon
        currentIcon = data.current.weather[0].icon;
        // displayingCurrentIcon(currentIcon);

}

//display weather icon
// function displayingCurrentIcon (){
//     document.getElementById('current-weather-icon').src="https://openweathermap.org/img/w/"+ currentIcon +".png"; 
//     currentIcon.textContent = currentIcon;
// }