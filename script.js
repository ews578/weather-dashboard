var key = "b7015ee8f3fd69eb81a57931e1dd354e";
var city = document.getElementById("city-search").value;
var baseUrl = "https://api.openweathermap.org/data/2.5/"
// lat=40.7608&lon=111.8910&appid="+key
var submitBtn = document.getElementById("submit-button")
var clearBtn = document.getElementById("clear-button")

function getWeather(city) {

    var weatherUrl = baseUrl + "weather?" + "q=" + city + "&appid=" + key + "&units=imperial"
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayWeather(data)
            getFiveDay(city)
        });
}

function getFiveDay(city) {

    var weatherUrl = baseUrl + "forecast?" + "q=" + city + "&appid=" + key + "&units=imperial"
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            
            for(var i=7;i<data.list.length; i+=8) {
                var day = data.list[i]
                var container = document.createElement("div")
                var date = document.createElement("p")
                date.innerText = dayjs.unix(day.dt).format("MM/DD/YY") 
                container.appendChild(date)
                var icon = document.createElement("img")
                icon.src = "https://openweathermap.org/img/wn/"+day.weather[0].icon+"@2x.png"
                container.appendChild(icon)
                var temp= document.createElement("p")
                temp.innerText = "Temp: " + day.main.temp + "F"
                container.appendChild(temp)
                document.getElementById("forecast").appendChild(container)
                var humidity = document.createElement("p")
                humidity.innerText = "Humidity: " + day.main.humidity + "%"
                container.appendChild(humidity)
                document.getElementById("forecast").appendChild(container)
                var windspeed = document.createElement("p")
                windspeed.innerText = "Windspeed: "+ day.wind.speed+"mph"
                container.appendChild(windspeed)
                document.getElementById("forecast").appendChild(container)
            }
        });
}

function displayWeather(data) {
    var currentTemp = document.getElementById("Temp")
    var windSpeed = document.getElementById("Wind")
    var humidity = document.getElementById("Humidity")
    var icon = document.getElementById("Current-Icon")
    icon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
    currentTemp.textContent = data.main.temp + "F"
    windSpeed.textContent = data.wind.speed + " mph"
    humidity.textContent = data.main.humidity + " %"
}

function searchWeather(event) {
    event.preventDefault();
    var searchCity = document.getElementById("city-search");
    var city = searchCity.value.trim();
    getWeather(city);

    // Save the searched city in local storage
    var searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
    if (!searchedCities.includes(city)) {
        searchedCities.push(city);
        localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
    }
}


function clearSearch() {
    localStorage.removeItem("searchedCities");
    // Clear the search history display on the UI as well
}
submitBtn.addEventListener("click", searchWeather)
clearBtn.addEventListener("click", clearSearch)