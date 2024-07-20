import {
  showWeatherData,
  showError,
  getWeatherData,
  validateInput,
} from "./app/app.js";
import { cityInput } from "./elements.js";
cityInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (validateInput(cityInput.value)) {
      let response = await getWeatherData(cityInput.value);
      if (response.error === null) {
        showWeatherData(response.data);
      } else {
        showError(response.error);
      }
    } else {
      showError("Invalid Input")
    }

    cityInput.value = "";
  }
});
