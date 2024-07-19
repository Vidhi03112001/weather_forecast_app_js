import { GET } from "./app/constants.js";
import { callApi } from "./app/app.js";
import { getUrl } from "./app/utility.js";
import { metric } from "./app/constants.js";
import { getDateTime, getTimezone } from "./app/utility.js";

let cityInput = document.getElementById("city-input");
let responseElement = document.querySelector(".response");
let cityMood = document.querySelector(".city-mood");
let cityName = document.querySelector(".city-name");
let cityTemp = document.querySelector(".city-temp");
let cityDesc = document.querySelector(".city-desc");
let cityTime = document.querySelector(".time");
let cityDate = document.querySelector(".date");
let timezone = document.querySelector(".timezone");
let windSpeed = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");
let pressure = document.querySelector("#pressure");
let sunrise = document.querySelector("#sunrise");
let sunset = document.querySelector("#sunset");

cityInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    responseElement.style.display = "block";
    let response = await getWeatherData(cityInput.value);
    console.log(response);
    cityMood.innerText = response["weather"][0]["main"];
    cityName.innerText = response["name"];
    cityTemp.innerText = `${response["main"]["temp"]}°C`;
    cityDesc.innerText = response["weather"][0]["description"];
    cityTime.innerText = getDateTime(response["dt"]).time;
    cityDate.innerText = getDateTime(response["dt"]).date;
    timezone.innerText = getTimezone(response["timezone"]);
    windSpeed.innerText = `${response["wind"]["speed"]}m/s`;
    humidity.innerText = `${response["main"]["humidity"]}%`;
    pressure.innerText = `${response["main"]["pressure"]}mmHg`;
    sunrise.innerText = getDateTime(response["sys"]["sunrise"]).time;
    sunset.innerText = getDateTime(response["sys"]["sunset"]).time;
    cityInput.value = "";
  }
});
async function getWeatherData(city) {
  let url = getUrl(city, metric);
  let response = await callApi(url, GET);
  return response;
}
