//  API key for OpenWeatherApp API and URL for the OpenWeatherMap API
const apiKey = "yourOwnAPIKey";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Element selectors
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Asynchronous function that fetches weather data from the OpenWeatherApp API based on a given city
async function checkWeather(city) {
    try {
        // Fetching the weather data and checking if response status is 404 (Invalid City)
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (response.status === 404) {
            // Display error message and hide the weather section
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }
        
        //  Parse JSON data from the API response
        const data = await response.json();
        
        //  Update the weather section with the fetched data
        document.querySelector(".city").innerHTML = data.name; 
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; 
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; 
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"; 
        
        // Dictionary mapping the weather conditions to their respective icons
        const weatherIcons = {
            Clouds: "clouds.png",
            Clear: "clear.png",
            Rain: "rain.png",
            Drizzle: "drizzle.png",
            Mist: "mist.png"
        };

        // Update the weather icon based on the current weather condition
        weatherIcon.src = weatherIcons[data.weather[0].main] || "default.png";

        //  Display the weather section and hide the error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        // Log any errors to the console
        console.error("Error fetching weather data: ", error);
        // Display the error message
        document.querySelector(".error").style.display = "block";
        // Hide the weather information section
        document.querySelector(".weather").style.display = "none";
    }
}
// Add an event listener to the search button to fetch weather data when clicked and call the checkWeather function with the value of the search box
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
