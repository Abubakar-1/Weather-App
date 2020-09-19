const form = document.getElementById("form");
const input = document.querySelector("input");
const errorMsg = document.getElementById("error_msg");
const container = document.getElementById("container");
const apiKey = "87f6f6b49de0b09b19b6d2f99901b473";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = input.value;

  const listItems = document.querySelectorAll("#results #cities");
  const listItemsArray = Array.from(listItems);

  console.log({ listItems, listItemsArray });


  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter((el) => {
      let content = "";
      if (inputVal.includes(",")) {
        if (inputVal.split(","[1].length > 2)) {
          inputVal = inputVal.split(","[0]);
          content = el.querySelector("#name").textContent.toLowerCase();
        } else {
          content = el.queryselector("#city").dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector("#name").textContent.toLowerCase();
      }
      return content === inputVal.toLocaleLowerCase();
    });

    if (filteredArray.length > 0) {
      errorMsg.textContent = `You already lnow the weather for ${
        filteredArray[0].querySelector("#name").textContent
      }.....otherwise be more specifc by specifying your country code as well`;
      form.reset();
      input.focus();
      return;
    }
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const { main, name, weather, sys } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
      const cities = document.createElement("div");
      cities.setAttribute("id", "cities");
      const city = `
           <div id="city"><span id='name'>${name}, ${sys.country}</span></div><br>
           <div id='temp'>
            <span>${Math.round(main.temp)}
                <sup>°C</sup>
             </span>
            </div><br>
           <div id="icon">
            <img src="${icon}"
           </div>
           <div id="weather-msg">${weather[0]["description"]}</div>
           `;

      cities.innerHTML = city;
      container.appendChild(cities);
    })
    .catch(() => {
      errorMsg.textContent = "Sorry, we can't find the city entered";
    });
  errorMsg.textContent = "";
  form.reset();
  input.focus();
});
