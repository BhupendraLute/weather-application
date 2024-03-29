const city_input = document.getElementById("city-input");
const weather_form = document.getElementById("weather-form");
const city = document.getElementById("city");
const degrees = document.getElementById("degrees");
const atmosphere = document.getElementById("atmosphere");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const weather_logo = document.getElementById("weather-logo");

async function fetchWeatherData(city = "mumbai") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3cf909619eb00a8e50f8f717c4f40c1`;

    const response = await fetch(url);
    const data = await response.json()
    // console.log(data);
    const cityName = data.name;
    const tempInCelcius = (data.main.temp - 273.15).toFixed(2);
    const atmos = data.weather[0]?.main;
    const icon = data.weather[0]?.icon;
    const humid = data.main.humidity;
    const wind = data.wind.speed;
    return { cityName, tempInCelcius, atmos, icon, humid, wind }
}

async function changeWeatherData() {
    const { cityName, tempInCelcius, atmos, icon, humid, wind } = await fetchWeatherData(city_input.value ? city_input.value.toString().trim().toLowerCase() : "mumbai");
    city.innerText = cityName;
    degrees.innerText = tempInCelcius;
    atmosphere.innerText = atmos;
    humidity.innerText = humid;
    wind_speed.innerText = wind;
    weather_logo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
}

weather_form.addEventListener("submit", async (e) => {
    e.preventDefault();
    changeWeatherData();
    city_input.value = "";
})

changeWeatherData();