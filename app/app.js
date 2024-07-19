import { getDateTime, getTimezone } from "./utility.js";

let cityInput = document.getElementById("city-input");
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

export const callApi = async (url, methodType) => {
  try {
    let response = await fetch(url, {
      method: methodType,
    });
    let data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      throw Error("Error : " + data["message"]);
    }
  } catch (error) {
    console.log(error.message);
    return {};
  }
};

export const showWeatherData = (response) => {
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
};
