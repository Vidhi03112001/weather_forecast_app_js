import {
  showWeatherData,
  showError,
  getWeatherData,
  validateInput,
  showLoading,
} from "./app/app.js";
import { cityInput } from "./elements.js";
cityInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    showLoading();
    if (validateInput(cityInput.value)) {
      let response = await getWeatherData(cityInput.value);
      if (response.error === null) {
        showWeatherData(response.data);
      } else {
        showError(response.error);
      }
    } else {
      showError("Error: Invalid Input");
    }
    cityInput.value = "";
  }
});

// Showing Default data after reloading the window
window.addEventListener("load", async (event) => {
  event.preventDefault();
   let response = await getWeatherData("Pune");
   showWeatherData(response.data);
});
