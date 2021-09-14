var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city');
var weatherContainerEl = document.querySelector('#weather-container');
var citySearchTerm = document.querySelector('#city-search-term');

var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getCityWeather(city);

        repoContainerEl.textContent = '';
        nameInputEl.value = '';
    } else {
        alert('Please enter a city');
    }
};

var buttonClickHandler = function(event) {
    var language = event.target.getAttribute('data-language');

    if (language) {
        getFeaturedRepos(language);

        repoContainerEl.textContent = '';
    }
};

var getCityWeather = function(city) {
    var apiUrl = 'https://api.github.com/users/' + city + '/repos';

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
        weatherContainerEl.textContent = 'No forcast found';
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

        repoContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener('submit', formSubmitHandler);
languageButtonsEl.addEventListener('click', buttonClickHandler);