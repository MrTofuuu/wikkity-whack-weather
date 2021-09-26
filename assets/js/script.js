var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city');
var weatherContainerEl = document.querySelector('#weather-container');
var citySearchTerm = document.querySelector('#city-search-term');
var weeklyForecast = [];
var currentCityName;
var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();
    // console.log("first print " + city);
    if (city) {
        // console.log(city);
        getLatLon(city);

        //weatherContainerEl.textContent = '';
        cityInputEl.value = '';
    } else {
        alert('Please enter a city');
    }
};

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
                    // console.log("this is the forcast data");
                    // console.log(data);
                    currentForecast = data.current;
                    console.log("current forecsst data");
                    console.log(currentForecast);
                    // console.log("array length is " + data.daily.length)
                    // saving weekly forecast info as an object
                    weeklyForecast = data.daily;
                    console.log("Weekly forecast info ")
                    console.log(weeklyForecast);
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
    // Checking to see if the object is empty 
    if (weeklyForecast.length === 0) {
        alert("no forecast info found");
        return;
    }
    // append to weatherContainerEl
    //creation of elements for current weather info
    var currentWeatherEL = document.createElement('ul');
    currentWeatherEL.classList = 'collection with-header';
    var currentCity = document.createElement('li');
    currentCity.innerHTML = '<li><h2 class="subtitle"><span id="city-search-term">' + currentCityName + ' and Date </span></h2></li>'
    var currentTemp = document.createElement('li');
    currentTemp.innerHTML = 'Temp: ' + 1;
    var currentWind = document.createElement('li');
    var currentUv = document.createElement('li');

    // loop to create the forecast info (max of 5 days)
    for (let i = 0; i < 5; i++) {
        // looped creation of 5 day forecast
    }

    currentWeatherEL.appendChild(currentCity);

    weatherContainerEl.appendChild(currentWeatherEL);

};

cityFormEl.addEventListener('submit', formSubmitHandler);