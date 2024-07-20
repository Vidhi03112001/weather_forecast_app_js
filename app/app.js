import { getDateTime, getTimezone, getUrl } from "./utility.js";
import { metric, GET } from "./constants.js";
import {
  responseElement,
  cityMood,
  cityName,
  cityTemp,
  cityDesc,
  cityTime,
  cityDate,
  timezone,
  windSpeed,
  humidity,
  pressure,
  sunrise,
  sunset,
  errorElement,
  loading
} from "../elements.js";

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

export const validateInput = (input) => {
  return input.trim() !== "";
};
export const showLoading=()=>{
  loading.classList.remove("hidden");
  responseElement.classList.add("hidden");
  errorElement.classList.add("hidden");
}
export const getWeatherData = async (city) => {
  let url = getUrl(city, metric);
  let response = await callApi(url, GET);
  return response;
};
export const showWeatherData = (response) => {
  console.log(response);
  loading.classList.add("hidden")
  responseElement.classList.remove("hidden");
  errorElement.classList.add("hidden");
  cityMood.innerText = response["weather"][0]["main"];
  cityName.innerText = response["name"];
  cityTemp.innerText = `${response["main"]["temp"]}°C`;
  cityDesc.innerText = response["weather"][0]["description"];
  cityTime.innerText = getDateTime(response["dt"]).time;
  cityDate.innerText = getDateTime(response["dt"]).date;
  timezone.innerText = getTimezone(response["timezone"]);
  windSpeed.innerText = `${response["wind"]["speed"]}m/s`;
  humidity.innerText = `${response["main"]["humidity"]}%`;
  pressure.innerText = `${Math.round(parseInt(response["main"]["pressure"])*0.75006375541921)}mmHg`;
  sunrise.innerText = getDateTime(response["sys"]["sunrise"]).time;
  sunset.innerText = getDateTime(response["sys"]["sunset"]).time;
};
export const showError = (error) => {
  console.log(error);
  loading.classList.add("hidden")
  responseElement.classList.add("hidden");
  errorElement.classList.remove("hidden");
  errorElement.innerHTML = `<h3>${error}</h3>`;
};

