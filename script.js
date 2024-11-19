// import { City_Names } from "./City_Names.js";
/******************************/
//Check if the api changes the name or adjust the case or something of input because "deli" results "delhi"
/**************************** */
import { apikey } from "./apifile.js";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const resultBox = document.querySelector(".auto-complete-box");
const inputBox = document.querySelector("#input-box");

//can use add event listener instead of this as well
inputBox.onkeyup = function () {
  console.log("fired");
  resultBox.innerHTML = "";
  let result = [];
  let input = inputBox.value;
  if (input.length) {
    result = City_Names.filter((keyword) => {
      return keyword.toLowerCase().includes(input.toLowerCase());
    });
    console.log(result);
  }
  display(result);
  if (!result.length) {
    resultBox.innerHTML = "";
  }
};

const display = (result) => {
  const ul = document.createElement("ul");

  result.forEach((list) => {
    const li = document.createElement("li");
    li.textContent = list;
    li.onclick = function () {
      selectInput(list);
    };
    ul.appendChild(li);
  });

  resultBox.appendChild(ul);
};

function selectInput(list) {
  console.log(list);
  inputBox.value = list;
  resultBox.innerHTML = "";
}

const errorFun = () => {
  document.querySelector(".error").style.display = "block";
  document.querySelector(".weather").style.display = "none";
};

async function checkWeather(cityName) {
  const response = await fetch(
    apiUrl + `q=${cityName}&appid=${apikey}&units=metric`
  );
  //   console.log(response);
  var data = await response.json();
  console.log(data);

  if (response.status === 404) {
    errorFun();
  }

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = "./images/clouds.png";
  } else if (data.weather[0].main === "Clear") {
    weatherIcon.src = "./images/clear.png";
  } else if (data.weather[0].main === "Rain") {
    weatherIcon.src = "./images/rain.png";
  } else if (data.weather[0].main === "Drizzle") {
    weatherIcon.src = "./images/drizzle.png";
  } else if (data.weather[0].main === "Mist") {
    weatherIcon.src = "./images/mist.png";
  } else if (data.weather[0].main === "Snow") {
    weatherIcon.src = "./images/snow.png";
  }

  document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
  if (searchBox.value === "") {
    errorFun();
  } else {
    checkWeather(searchBox.value);
    searchBox.value = "";
  }
});

searchBox.addEventListener("keydown", (event) => {
  console.log("keydown event fired");
  if (event.key === "Enter") {
    if (searchBox.value === "") {
      errorFun();
    } else {
      checkWeather(searchBox.value);
      searchBox.value = "";
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/") {
    searchBox.focus();
    event.preventDefault(); // After setting focus on the searchBox input field, we call event.preventDefault() to prevent the default action of the keydown event when the "/" key is pressed. This prevents the "/" character from being typed into the input field.
  }
});

// const autoComplete = () => {
//   const li = document.createElement("LI");//creates li tag
//   const option = li.classList.add("autoCompleteOptions");
//   fetch("citylist.json")
//   .then((response) => response.json())
//   .then((data) => {
//       // console.log(data);
//       // You can work with the JSON data here
//       data.forEach((element) => {
//           if (element.name.includes(searchBox.value)) {
//           autoText.appendChild.option
//       }
//     });
//   })
// };
