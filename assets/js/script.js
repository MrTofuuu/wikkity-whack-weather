var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city');
var weatherContainerEl = document.querySelector('#weather-container');
var citySearchTerm = document.querySelector('#city-search-term');

var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();
    console.log("first print " + city);
    if (city) {
        console.log(city);
        getCityLatLon(city);

        //weatherContainerEl.textContent = '';
        cityInputEl.value = '';
    } else {
        alert('Please enter a city');
    }
};
// fetch('https://api.openweathermap.org/data/2.5/forecast?q=dallas&appid=f48eeb974e0cd19636dc2234eda9e443')
//     .then(function(response) {
//         if (response.ok) {
//             console.log(response);
//             response.json().then(function(data) {
//                 console.log(data);
//             })
//         } else {
//             console.log("Error: " + response.statusText);
//         }
//     })

var getCityLatLon = function(city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=f48eeb974e0cd19636dc2234eda9e443';
    // api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
    // console.log(apiUrl);
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                // console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                    // return data;
                });
            } else {
                alert('Error: ' + response.statusText);
                //return lat and lon or should i jsut save the api response as an object and only use the lat lon info?
            }
        }).catch(function(error) {
            alert('Unable to getCityLatLon: invalid connection');
        });
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


var displayWeather = function(weather, searchTerm) {};

function printWeather() {
    //logic to print the weather goes here
}
cityFormEl.addEventListener('submit', formSubmitHandler);