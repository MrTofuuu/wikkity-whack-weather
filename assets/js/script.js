var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city');
var weatherContainerEl = document.querySelector('#weather-container');
var citySearchTerm = document.querySelector('#city-search-term');

var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getCityWeather(city);

        weatherContainerEl.textContent = '';
        cityInputEl.value = '';
    } else {
        alert('Please enter a city');
    }
};
var getCityLatLon = function(city) {
    var apiUrl = 'api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=f48eeb974e0cd19636dc2234eda9e443';
    // api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                });
            } else {
                alert('Error: ' + response.statusText);
                data.lat
                data.lon
                    //return lat and lon or should i jsut save the api response as an object and only use the lat lon info?
            }
        })
}
var getCityWeather = function(getCityLatLon) {
    var apiUrl = ''
        // doing two api calls (nested fetch)? 
        // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
        //api.openweathermap.org/data/2.5/forecast/daily?q={city name},{state code},{country code}&cnt={cnt}&appid={API key} this might be the more correct use case for the hw
        //f48eeb974e0cd19636dc2234eda9e443 api key
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayWeather(data, city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to OpenWeather');
        });
};


var displayWeather = function(weather, searchTerm) {
    if (weather.length === 0) {
        weatherContainerEl.textContent = 'No forecast found';
        return;
    }

    citySearchTerm.textContent = searchTerm;
    //left off here 9-11
    for (var i = 0; i < repos.length; i++) {
        var repoName = repos[i].owner.login + '/' + repos[i].name;

        var repoEl = document.createElement('div');
        repoEl.classList = 'list-item flex-row justify-space-between align-center';

        var titleEl = document.createElement('span');
        titleEl.textContent = repoName;

        repoEl.appendChild(titleEl);

        var statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';

        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.appendChild(statusEl);

        weatherContainerEl.appendChild(repoEl);
    }
};

function printWeather() {
    //logic to print the weather goes here
}
cityFormEl.addEventListener('submit', formSubmitHandler);