import { GET } from "./app/constants.js";
import { callApi } from "./app/app.js";
import { getUrl } from "./app/utility.js";
import { metric } from "./app/constants.js";
import {showWeatherData } from "./app/app.js"

let cityInput = document.getElementById("city-input");
let responseElement = document.querySelector(".response");

cityInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
   responseElement.classList.remove("hidden");
    let responseData = await getWeatherData(cityInput.value);
    showWeatherData(responseData)
  }
});
async function getWeatherData(city) {
  let url = getUrl(city, metric);
  let response = await callApi(url, GET);
  return response;
}
