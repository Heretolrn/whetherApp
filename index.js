let country = document.getElementById("country");
let submitbtn = document.getElementById("submit");
let responseCard = document.querySelector(".responseCard");
let information = document.querySelector(".information");
let whether = document.querySelector(".whether");
let countryName = document.querySelector(".countryName");
let errormessage = document.querySelector(".errormessage");
let mid = document.querySelector(".mid");
let bigcard = document.querySelector(".bigcard");
//array of cities
let cities = [
  "cape coast",
  "Accra",
  "Tarkwa",
  "takoradi",
  "tamale",
  "tema",
  "kumasi",
  "bolgatanga",
  "winneba",
  "kasoa",
  "mankessim",
  "koforidua",
];
//array of whether conditions
let whetherCondition = {
  Clear: "☀️",
  PartlyCloudy: "⛅",
  Clouds: "☁️",
  Foggy: "🌫️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  HeavyRain: "🌧️",
  Showers: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Sleet: "🌨️",
  Hail: "🌦️",
  FreezingRain: "🌧️❄️",
  SnowShowers: "🌦️❄️",
  Blizzard: "🌨️❄️🌬️",
  Tornado: "🌪️",
  HurricaneCycloneTyphoon: "🌀",
  TropicalStorm: "🌊",
  DustStorm: "🌫️💨",
  Windy: "🌬️",
  Mist: "🌫️",
  Haze: "🌫️",
  Smoke: "🌫️🔥",
  Hot: "🔥🌞",
  Cold: "❄️🌬️",
  Humid: "🌞🌡️💧",
  Dry: "🏜️🌵",
};

//fetches for the Api with the country specified
submitbtn.addEventListener("click", function () {
  if (country.value !== "") {
    submitbtn.innerHTML = '<i class="bi bi-hourglass-split"></i>';
    let apiKey = "728490fb66ef4b3db7906762382a8e8c";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${country.value}&appid=${apiKey}`;
    let response = fetch(url);
    //while the fetch has not produces a response yet
    let ispending = true;

    //recieving the fetch data
    response
      .then((data) => {
        mid.classList.remove("midnone");
        ispending = false;
        submitbtn.innerHTML = "submit";

        let reschild = document.createElement("div");

        //converting the response to json format
        data.json().then((jsonData) => {
          console.log(jsonData.cod);
          //checkes for the status code
          if (jsonData.cod == 200) {
            //remove the loading svg when it recieves the response
            responseCard.removeChild(responseCard.firstChild);
            let wheatherStatus = jsonData.weather[0].main;

            //creating a h3 that holds the country name
            let ctry = document.createElement("h3");
            ctry.setAttribute("id", "ctry");
            ctry.innerText = jsonData.name;
            responseCard.appendChild(ctry);

            //creating a div that holds the Day eg. Monday
            let day = document.createElement("div");
            day.setAttribute("id", "day");
            //use the date function to get the day num and searching for the exact date in the array
            let date = new Date();
            let datenum = date.getDay();
            const daysOfWeek = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            const dayName = daysOfWeek[datenum];
            day.innerText = dayName;
            responseCard.appendChild(day);

            //a p element that holds the whether emoji
            let icon = document.createElement("p");
            icon.setAttribute("id", "icon");
            icon.innerText = `${jsonData.weather[0].description}`;
            //check if the icon is available
            if (wheatherStatus in whetherCondition) {
              bigcard.innerText = whetherCondition[wheatherStatus];
              console.log(whetherCondition[wheatherStatus]);
            } //if not it should use the default
            else {
              bigcard.innerText = whetherCondition[clear];
            }
            responseCard.appendChild(icon);

            //a div element that holds the temperature value
            let temp = document.createElement("div");
            temp.setAttribute("id", "temp");
            temp.innerText = jsonData.main.temp + "°";
            responseCard.appendChild(temp);

            //a div element that holds the whether information
            let info = document.createElement("div");
            info.setAttribute("id", "info");
            info.innerText = jsonData.weather[0].main;
            responseCard.appendChild(info);
            responseCard.appendChild(reschild);
          }
          //produce response if the country was not found
          else if (jsonData.cod == 404) {
            responseCard.innerHTML = "<p>country/city not found</p>";
          }
        });
      })

      //catching the error
      .catch((error) => {
        submitbtn.innerHTML = "submit";
        errormessage.style.display = "block";
        //make the errormessage disappear in 4s
        setTimeout(() => {
          errormessage.style.display = "none";
        }, 4000);
      });

    //resetng the input value to nul
    country.value = "";

    //shows a loading svg when the response in pending
    if (ispending) {
      responseCard.innerHTML = '<i class="bi bi-arrow-clockwise pending"></i>';
    }
  }
});

let otherCountries = document.querySelector(".otherCountries");
//hides the search card once the page loads or reloads
window.addEventListener("load", function () {
  for (city of cities) {
    let apiKey1 = "728490fb66ef4b3db7906762382a8e8c";
    let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey1}`;
    let response1 = fetch(url1);

    response1
      .then((data) => {
        data.json().then((jsondata1) => {
          console.log(jsondata1.name);
          if (jsondata1.cod == 200) {
            let wheatherStatus = jsondata1.weather[0].main;

            let responseCard1 = document.createElement("div");
            responseCard1.classList.add("responseCard");

            //creating a h3 that holds the country name
            let ctry = document.createElement("h3");
            ctry.setAttribute("class", "ctry");
            ctry.innerText = jsondata1.name;
            responseCard1.appendChild(ctry);

            //creating a div that holds the Day eg. Monday
            let day = document.createElement("div");
            day.setAttribute("class", "day");
            //use the date function to get the day num and searching for the exact date in the array
            let date = new Date();
            let datenum = date.getDay();
            const daysOfWeek = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            const dayName = daysOfWeek[datenum];
            day.innerText = dayName;
            responseCard1.appendChild(day);

            //a p element that holds the whether emoji
            let icon = document.createElement("p");
            icon.setAttribute("class", "icon");
            //check if the icon is available
            if (wheatherStatus in whetherCondition) {
              icon.innerText = whetherCondition[wheatherStatus];
              console.log(whetherCondition[wheatherStatus]);
            } //if not it should use the default
            else {
              icon.innerText = whetherCondition[clear];
            }
            responseCard1.appendChild(icon);

            //a div element that holds the temperature value
            let temp = document.createElement("div");
            temp.setAttribute("class", "temp");
            temp.innerText = jsondata1.main.temp + "°";
            responseCard1.appendChild(temp);

            //a div element that holds the whether information
            let info = document.createElement("div");
            info.setAttribute("class", "info");
            info.innerText = jsondata1.weather[0].main;
            responseCard1.appendChild(info);
            otherCountries.appendChild(responseCard1);
          }
        });
      })
      .catch((error) => {
        console.log(error);
        errormessage.style.display = "block";
      });
  }
});
