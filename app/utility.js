import { baseUrl, appKey } from "./constants.js";

export const getUrl = (city, units) => {
  return `${baseUrl}?q=${city}&appid=${appKey}&units=${units}`;
};

export const getDateTime = (epochTime) => {
  let date = new Date(epochTime * 1000);
  return {
    date: getDate(date.getDate(), date.getMonth() + 1, date.getFullYear()),
    time: getTime(date.getHours(), date.getMinutes(), date.getSeconds()),
  };
};

const getDoubleDigit = (digit) => {
  if (digit >= 0 && digit <= 9) {
    return `0${digit}`;
  }
  return digit;
};

const getDate = (date, month, year) => {
  return `${getDoubleDigit(date)}/${getDoubleDigit(month)}/${year}`;
};

const getTime = (hours, minutes, seconds) => {
  return `${getDoubleDigit(hours)}:${getDoubleDigit(minutes)}:${getDoubleDigit(
    seconds
  )}`;
};

export const getTimezone = (offsetSeconds) => {
  let sign = "";
  let intOffsetSeconds = parseInt(offsetSeconds);
  if (intOffsetSeconds >= 0) {
    sign = "+";
  } else {
    sign = "-";
    intOffsetSeconds *= -1;
  }
  let decimalHours = intOffsetSeconds / 3600;
  let decimalHoursStr = `${decimalHours}`;
  let hours = parseInt(decimalHoursStr.split(".")[0]);
  let minutes = (decimalHours - hours) * 60;

  return `${sign} ${getDoubleDigit(hours)}:${getDoubleDigit(minutes)} GMT`;
};
