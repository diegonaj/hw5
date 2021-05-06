// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
    // Get a reference to the "get weather" button
    let getWeatherButton = document.querySelector(`.get-weather`)
  
    // When the "get weather" button is clicked:
    getWeatherButton.addEventListener(`click`, async function(event) {
      // - Ignore the default behavior of the button
      event.preventDefault()
  
      // - Get a reference to the element containing the user-entered location
      let locationInput = document.querySelector(`#location`)
  
      // - Get the user-entered location from the element's value
      let location = locationInput.value
  
      // - Check to see if the user entered anything; if so:
      if (location.length > 0) {
        // - Construct a URL to call the WeatherAPI.com API
        let url = `https://api.weatherapi.com/v1/forecast.json?key=53a0155e46494151b76200952212604&q=${location}&days=3`
  
        // - Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
  
        // - Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json()
  
        // - Write the json-formatted data to the JavaScript console
        console.log(json)
  
        // - Store the returned location and current weather conditions as two separate variables
        let interpretedLocation = json.location
        let currentWeather = json.current
  
        // Store a reference to the "current" element
        let currentElement = document.querySelector(`.current`)
  
        // Fill the current element with the location and current weather conditions
        currentElement.innerHTML = `
          <div class="text-center space-y-2">
            <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}</div>
            <div class="font-bold">
              <img src="https://${currentWeather.condition.icon}" class="inline-block">
              <span class="temperature">${currentWeather.temp_c}</span>° 
              and
              <span class="conditions">${currentWeather.condition.text}</span>
            </div>
          </div>
        `
        // - Get a reference to the element containing the user-entered forecast days
        let numberDaysInput = document.querySelector(`#days`)

        // - Get the user-entered forecast days from the element's value
        let numberDays = numberDaysInput.value  

        // Store a reference to the "forecast" element
        let forecastElement = document.querySelector(`.forecast`)

        // - Store the forecast in a separate variables
        let dailyForecast = json.forecast

        // - Check to see if the user entered a number between 1 and 3:
        if (numberDays < 1 || numberDays > 3) {
            alert(`Enter a number between 1 and 3`)}

        // Insert HTML into the forecast element
        else {forecastElement.innerHTML = `
        <div class="text-center space-y-8">
        <div class="font-bold text-3xl">${numberDays} Day Forecast</div>`

        // Display data using a loop
        for (let i = 0; i < numberDays; i++) {

        // Create a variable for the number of forecast day
        let forecastDay = dailyForecast.forecastday[i]

        // Insert HTML into the forecast element, using the data from each day
        forecastElement.insertAdjacentHTML(`beforeend`,
        `<div class="text-center space-y-8">
        <div>
            <img src="https://${forecastDay.day.condition.icon}" class="mx-auto">
            <h1 class="text-2xl text-bold text-gray-500">${forecastDay.date}</h1>
            <h2 class="text-xl">High ${forecastDay.day.condition.maxtemp_c}° – Low ${forecastDay.day.condition.mintemp_c}°</h2>
            <p class="text-gray-500">${forecastDay.day.condition.text}</h1>
          </div>
          `)}}
    }})
    })