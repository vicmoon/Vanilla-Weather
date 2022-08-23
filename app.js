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

search("Prague");


function displayTemperature(response){
   
let temperatureElement=document.querySelector("#temperature");
let cityElement=document.querySelector("#your-city");
let descriptionElement=document.querySelector("#description");
let humidityElement=document.querySelector("#humidity");
let windElement=document.querySelector("#wind");
let dateElement=document.querySelector("#date");
let iconElement=document.querySelector("#icon");

descriptionElement.innerHTML=response.data.weather[0].description;
temperatureElement.innerHTML=Math.round(response.data.main.temp);
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

}


let form=document.querySelector("#search-form");
form.addEventListener("submit", searchForm);