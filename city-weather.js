const apikey = "ffd65a92d05ccbe55a9cf97f166407de";  // Exposing this isn't safe
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiurl + city + '&appid=' + apikey);

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerText = data.name;
        document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerText = data.main.humidity + "%";
        document.querySelector(".wind").innerText = data.wind.speed + " km/h";

        // Using a switch for cleaner code
        switch (data.weather[0].main) {
            case 'Clouds': weatherIcon.src = "clouds.png"; break;
            case 'Clear': weatherIcon.src = "clear.png"; break;
            case 'Rain': weatherIcon.src = "rain.png"; break;
            case 'Snow': weatherIcon.src = "snow.png"; break;
            case 'Mist': weatherIcon.src = "mist.png"; break;
            case 'Drizzle': weatherIcon.src = "drizzle.png"; break;
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error(error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
});
