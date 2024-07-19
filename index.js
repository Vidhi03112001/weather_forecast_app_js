import { showWeatherData ,showError,getWeatherData} from "./app/app.js";
import { cityInput } from "./elements.js";
cityInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    let response = await getWeatherData(cityInput.value);
    if (response.error === null) {
      showWeatherData(response.data);
    } else {
      showError(response.error)
    }
    cityInput.value = "";
  }
});
