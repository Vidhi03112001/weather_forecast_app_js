import { baseUrl, appKey } from "./constants.js";

export const getUrl = (city) => {
  return `${baseUrl}?q=${city}&appid=${appKey}`;
};
