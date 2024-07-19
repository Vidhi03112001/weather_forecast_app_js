import { getDateTime, getTimezone,getUrl } from "./utility.js";
import { metric,GET } from "./constants.js";

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
let errorElement = document.querySelector(".error");

export const callApi = async (url, methodType) => {
  try {
    let response = await fetch(url, {
      method: methodType,
    });
    let data = await response.json();
    if (response.status === 200) {
      return { error: null, data: data };
    } else {
      throw Error("Error : " + data["message"]);
    }
  } catch (error) {
    console.log(error.message);
    return { error: error.message, data: null };
  }
};
export const getWeatherData = async (city) => {
  let url = getUrl(city, metric);
  let response = await callApi(url, GET);
  return response;
};
export const showWeatherData = (response) => {
  console.log(response);
  responseElement.classList.remove("hidden");
  errorElement.classList.add("hidden")
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
};
export const showError = (error) => {
  console.log(error);
  responseElement.classList.add("hidden");
  errorElement.classList.remove("hidden");
  errorElement.innerHTML = `<h3>${error}</h3>`;
};
