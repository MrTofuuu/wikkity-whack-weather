var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city');
var weatherContainerEl = document.querySelector('#weather-container');
var forecastContainerEl = document.querySelector('#forecast-container');
var currentWeatherEL;
var citySearchTerm = document.querySelector('#city-search-term');
var cityListEl = document.querySelector('#city-list');
var weeklyForecast;
var currentCityName;
var cityList = [];
var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();
    // console.log("first print " + city);
    if (city) {
        // console.log(city);
        getLatLon(city);
        renderPreviousCity(city);
        cityInputEl.value = '';
    } else {
        alert('Please enter a city');
    }



};
// rendering of the previous city list, it also includes removing if list is over 10 items 
function renderPreviousCity(city) {
    //clears previous city list so that there will not be duplicates renders
    cityListEl.innerHTML = "";
    // removing first entry in the city list if it's over 10 entries
    if (cityList.length > 10) {
        cityList.shift();
    }
    // render a new button for old searches
    for (let i = 0; i < cityList.length; i++) {
        // uppercasing of first letter  
        var upperCity = city.charAt(0).toUpperCase() + city.slice(1);
        // variable to create a button
        var button = document.createElement('button');
        button.classList = 'btn grey lighten-1'
        button.textContent = upperCity;

        // appending to city list container 
        cityListEl.appendChild(button);
    }


}
// initialize items on page load, previous saved cities 
function init() {

}
// Function for stroing previous city to localstorage
function storePreviousCity() {
    localStorage.setItem("cityList", JSON.stringify(cityList));
}
// Function to get the lattitude and longitude 
var getLatLon = function(city) {
    var apiKey = 'f48eeb974e0cd19636dc2234eda9e443'
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey + '&units=imperial';
    // api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
    // console.log(apiUrl);
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                // console.log(response);
                response.json().then(function(data) {
                    // console.log("this is in the getLatLon")
                    // console.log(data);
                    // console.log("Lat is " + data.city.coord.lat + " lon is " + data.city.coord.lon);
                    // assigning current city name to be used for printing 
                    currentCityName = data.city.name
                        // currentForecast = data;
                        // console.log('the city is ' + currentCityName);
                    getWeather(data.city.coord.lat, data.city.coord.lon);
                });
            } else {
                alert('Error: ' + response.statusText);
                //return lat and lon or should i jsut save the api response as an object and only use the lat lon info?
            }
        }).catch(function(error) {
            alert('Unable to getLatLon: invalid connection');
        });
}

// Function to get the weather forecast of the city
var getWeather = function(lat, lon) {
    var apiKey = 'f48eeb974e0cd19636dc2234eda9e443'
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + apiKey + "&units=imperial";

    // doing two api calls (nested fetch)? 
    // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    //api.openweathermap.org/data/2.5/forecast/daily?q={city name},{state code},{country code}&cnt={cnt}&appid={API key} this might be the more correct use case for the hw
    //f48eeb974e0cd19636dc2234eda9e443 api key
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    // console.log("this is the api returned data for one call");
                    // console.log(data);
                    // console.log("array length for daily is " + data.daily.length)
                    // saving current and weekly forecast info as an object 
                    currentForecast = data.current;
                    weeklyForecast = data.daily;
                    console.log("current forecast data");
                    console.log(currentForecast);
                    console.log("Weekly forecast info ")
                    console.log(weeklyForecast);
                    console.log("this is the humidity from the first " + weeklyForecast[0].humidity)
                    console.log(weeklyForecast[0].humidity);
                    displayWeather(weeklyForecast);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to OpenWeather');
        });
};


var displayWeather = function(weeklyForecast) {
    console.log("this is the display weather function");
    var forecastDate;
    // Checking to see if the object is empty 
    if (weeklyForecast.length === 0) {
        alert("no forecast info found");
        return;
    }
    // Clears current display if it exists
    if (currentWeatherEL) {
        console.log("currentWeatherEl if statement works");
        weatherContainerEl.removeChild(currentWeatherEL);
        forecastContainerEl.innerHTML = "";
    }
    console.log('this is current weather');
    console.log(currentForecast);
    forecastDate = currentForecast.dt;
    var formatDate = new Date(forecastDate * 1000).toLocaleDateString("en-US");
    //creation of elements for current weather info
    currentWeatherEL = document.createElement('ul');
    currentWeatherEL.classList = 'collection with-header';
    var currentCity = document.createElement('li');
    currentCity.innerHTML = '<li><h2 class="subtitle"><span id="city-search-term">' + currentCityName + ' ' + formatDate + '</span></h2></li>'
    var currentTemp = document.createElement('li');
    currentTemp.innerHTML = 'Temp: ' + currentForecast.temp;
    var currentWind = document.createElement('li');
    currentWind.innerHTML = 'Wind: ' + currentForecast.wind_speed;
    var currentHum = document.createElement('li');
    currentHum.innerHTML = 'Humidity: ' + currentForecast.humidity;
    var currentUv = document.createElement('li');
    currentUv.innerHTML = 'UVI: ' + currentForecast.uvi;


    // loop to create the forecast info (max of 5 days)
    for (let i = 0; i < 5; i++) {
        // Getting date from object, but it is in GMT unix format
        forecastDate = weeklyForecast[i].dt;
        var weatherObj = weeklyForecast[i].weather[0]
        var icon = weatherObj.icon;
        var iconUrl = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
        console.log(icon)
        console.log(iconUrl);
        // console.log(forecastDate)
        // converting the timestamp to MM/DD/YYYY
        formatDate = new Date(forecastDate * 1000).toLocaleDateString("en-US");
        //creation of 5 day forecast
        var forecastCol = document.createElement('div');
        forecastCol.classList = 'col s2 forecast ';
        var forecastCard = document.createElement('div');
        forecastCard.classList = 'card  blue-grey darken-1';
        var forecastContent = document.createElement('div');
        forecastContent.classList = 'card-content white-text'
        var forecastDate = document.createElement('p');
        forecastDate.innerHTML = formatDate;
        var forecastIcon = document.createElement('p');
        forecastIcon.innerHTML = '<img src=' + iconUrl + '>';
        var forecastTemp = document.createElement('p');
        forecastTemp.innerHTML = 'Temp: ' + weeklyForecast[i].temp.day + ' °F';
        var forecastWind = document.createElement('p');
        forecastWind.innerHTML = 'Wind: ' + weeklyForecast[i].wind_speed + ' MPH';
        var forecastHum = document.createElement('p');
        forecastHum.innerHTML = 'Humidity: ' + weeklyForecast[i].humidity + ' %';
        //appending all info to the cards
        forecastContent.appendChild(forecastDate);
        forecastContent.appendChild(forecastIcon);
        forecastContent.appendChild(forecastTemp);
        forecastContent.appendChild(forecastWind);
        forecastContent.appendChild(forecastHum);

        forecastCard.appendChild(forecastContent)

        forecastCol.appendChild(forecastCard);
        // appending all to 
        forecastContainerEl.appendChild(forecastCol);

    }

    // appending all current weather info to a list 
    currentWeatherEL.appendChild(currentCity);
    currentWeatherEL.appendChild(currentTemp);
    currentWeatherEL.appendChild(currentWind);
    currentWeatherEL.appendChild(currentHum);
    currentWeatherEL.appendChild(currentUv);

    // appending the list to the weather container 
    weatherContainerEl.appendChild(currentWeatherEL);

};

cityFormEl.addEventListener('submit', formSubmitHandler);

init();