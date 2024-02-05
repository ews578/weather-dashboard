var key = "b7015ee8f3fd69eb81a57931e1dd354e";
var city = document.getElementById;
var baseUrl = "https://api.openweathermap.org/data/2.5/"
// lat=40.7608&lon=111.8910&appid="+key
var submitBtn = document.getElementById("submit-button")
var clearBtn = document.getElementById("clear-button")
function getWeather(city) {
    
 var weatherUrl = baseUrl+"weather?"+"q="+city+"&appid="+key+"&units=imperial"
    fetch(weatherUrl)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
         displayWeather(data)
    });
}

function displayWeather(data) {
    var currentTemp=document.getElementById("Temp")
    var windSpeed=document.getElementById("Wind")
    var humidity=document.getElementById("Humidity")
    currentTemp.textContent=data.main.temp+"F"
    windSpeed.textContent=data.wind.speed+" mph"
    humidity.textContent=data.main.humidity+" %"
}

function searchWeather(event){
    event.preventDefault()
    var searchCity = document.getElementById("city-search")
    var city = searchCity.value.trim()
    getWeather(city)
    
//add localstorage array searched cities
}

function clearSearch(){
    
}
submitBtn.addEventListener("click",searchWeather)
clearBtn.addEventListener("click",clearSearch)