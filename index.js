import { GET } from "./constants.js";
import { callApi } from "./app.js";
import { getUrl } from "./utility.js";

async function getWeatherData(city) {
  let url = getUrl(city);
  let response = await callApi(url, GET);
  console.log(response);
}
getWeatherData("Pune");
