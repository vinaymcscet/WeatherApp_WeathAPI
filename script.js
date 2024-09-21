const searchValue = document.querySelector(".searchField");
const form = document.querySelector("form");
const temperatureField = document.querySelector(".temp");
const cityField = document.querySelector(".time_location p");
const dateField = document.querySelector(".time_location span");
const emojiField = document.querySelector(".weather_condition img");
const weatherField = document.querySelector(".weather_condition span");

form.addEventListener("submit", handleWeatherAppForm);

function handleWeatherAppForm(ev) {
  ev.preventDefault();
  let weatherCity = searchValue.value;
  getWeatherLocation(weatherCity);
}

function getDayName(num) {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";

    default:
      break;
  }
}

function updateDOM(
  locationName,
  localtime,
  temp,
  conditionName,
  conditionEmoji
) {
  const exactDate = localtime.split(" ")[0];
  const exactTime = localtime.split(" ")[1];

  const dayNumber = new Date(localtime).getDay();
  const exactDay = getDayName(dayNumber);

  temperatureField.innerText = temp;
  cityField.innerText = locationName;
  dateField.innerText = `${exactTime} - ${exactDay} - ${exactDate}`;
  emojiField.src = "https:" + conditionEmoji;
  emojiField.alt = conditionName;
  weatherField.innerText = conditionName;
}

async function getWeatherLocation(target) {
  const url = `https://api.weatherapi.com/v1/current.json?key=b18fff0b47e6452a8cc62351242109&q=${target}&aqi=no`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const locationName = data.location.name;
    const localtime = data.location.localtime;
    const temp = data.current.temp_c;
    const conditionName = data.current.condition.text;
    const conditionEmoji = data.current.condition.icon;
    updateDOM(locationName, localtime, temp, conditionName, conditionEmoji);
  } catch (error) {
    console.error("ERROR ::: ", error.message);
    alert("Kindly enter valid city name");
  }
}

getWeatherLocation("New Delhi");
