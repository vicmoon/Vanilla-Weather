function formatDate(timestamp){


    let date =new Date(timestamp);
    let hours = date.getHours();
    if (hours <10){
        hours =`0${hours}`;
    }
    let minutes =date.getMinutes();
    if (minutes <10){
        minutes=`0${minutes}`;
    } 
    
    let days= ["Sunday", "Monday","Tuesday","Wednesday" ,"Thursday", "Friday","Saturday"];
    let day =days[date.getDay()];

    return `${day} ${hours} : ${minutes}`
}


function  showDate(timestamp) {

 let date   =new Date(timestamp *1000); 
 let day = date.getDay(); 
 let days = ["Mon", "Tue", "Wed", "Thu", "Fri" ,"Sat", "Sun" ]; 

 return days[day];

}


function displayForecast(response){
    console.log(response.data.daily);

    let forecast =response.data.daily;

    let forecastElement=document.querySelector("#forecast");

    let forecastHTML=`<div class= "row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
        forecastHTML = forecastHTML + `
          <div class="col-2"> 
          <div class="forecast-date">
         ${showDate(forecastDay.dt)}
          </div>
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"/>
          <div class="forecast-temperature"> 
          <span class="max-temperature">${Math.round(
            forecastDay.temp.max)}°</span>
          <span class="min-temperature" > ${Math.round(
            forecastDay.temp.min)}°</span>
          </div>
        </div>
        `;     
        }
    });
    
 
    forecastHTML= forecastHTML + `</div>`;
    forecastElement.innerHTML=forecastHTML;
}

function getForecast(coordinates) { 

 let apiKey ="a797ee45374c07f8f53469ef56ba3a8c"; 
 let apiURL =`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
console.log(apiURL);
axios.get(apiURL).then(displayForecast);
}



function displayTemperature(response){
   
    let temperatureElement=document.querySelector("#temperature");
    let cityElement=document.querySelector("#your-city");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");
    
    celsiusTemp = response.data.main.temp;
    descriptionElement.innerHTML=response.data.weather[0].description;
    temperatureElement.innerHTML=Math.round(celsiusTemp);
    cityElement.innerHTML=response.data.name;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt*1000);
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute(
        "alt",`${response.data.weather[0].description}`
    );
    
    getForecast(response.data.coord);
    }


function search(city){
    let apiKey ="a797ee45374c07f8f53469ef56ba3a8c"; 
    let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature); 


}
function searchForm(event){
   event.preventDefault();

   let cityInputElement=document.querySelector("#input-city");
   search(cityInputElement.value);
   console.log(cityInputElement.value);
}


function showFahreheit(event){
    event.preventDefault(); 
    let temperatureElement=document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

    let fahrenheitTemp= (celsiusTemp*9)/5+32;
    temperatureElement.innerHTML= Math.round(fahrenheitTemp);
}

function showCelsius(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML=Math.round(celsiusTemp);
}



let form=document.querySelector("#search-form");
form.addEventListener("submit", searchForm);


search("Prague");
