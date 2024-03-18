var weatherApi = "/weather";
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");
const tempElement = document.querySelector(".temperature span");

const locationElement = document.querySelector(".place");
const dateElement = document.querySelector(".date");

const currentDate = new Date();
const options = {month:"long"};
const monthName = currentDate.toLocaleString('en-US',options);

dateElement.textContent = currentDate.getDate()+", "+monthName ;

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    locationElement.textContent = "Loading..";
    weatherIcon.className ="";
    tempElement.textContent = "";
    weatherCondition.textContent = "";

    showData(search.value);
});

function showData(city) {
    getWeatherData(city, (result) => {
       // console.log(result);

        // Update location text content
        locationElement.textContent = result.location?.name ?? "Enter proper Location";

        // Update temperature text content
        tempElement.textContent = result.current?.temp_c ? result.current.temp_c + "°C" : "";

        // Update weather icon and description based on weather condition
        if (result.current && result.current.condition && result.current.condition.text) {
            const weatherCondition = result.current.condition.text.toLowerCase();
            setWeatherIcon(weatherCondition);
        } else {
            // Set default weather icon
            weatherIcon.className = "wi wi-day-cloudy";
        }
    });
}

function setWeatherIcon(weatherCondition) {
    // Example logic to set weather icon based on weather condition
    switch (weatherCondition) {
        case "cloudy":
            weatherIcon.className = "wi wi-day-cloudy";
            break;
        case "rain":
            weatherIcon.className = "wi wi-rain";
            break;
        case "chill":
            weatherIcon.className = "wi wi-snowflake-cold";
            break;
        case "hot":
            weatherIcon.className = "wi wi-hot";
            break;
        default:
            weatherIcon.className = "wi wi-day-sunny";
    }
}




async function getWeatherData(city, callback) {
    try {
        const locationApi = `${weatherApi}?address=${city}`;
        const response = await fetch(locationApi);
        
        if (!response.ok) {
            throw new Error("Failed to fetch weather data. Server returned status: " + response.status);
        }
        
        const data = await response.json();
        callback(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
