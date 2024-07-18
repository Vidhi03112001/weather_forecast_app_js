import { baseUrl,appKey } from "./constants.js";
import { callApi } from "./app.js";

async function getData(baseUrl,city,appKey) {
    const url =
  `${baseUrl}?q=${city}&appid=${appKey}`;
  let response = await callApi(url,"GET");
  console.log(response);
}
getData(baseUrl,"Pune",appKey);
