function displayTemperature(response){
console.log(displayTemperature);
console.log(response.data); 
let temperatureElement=document.querySelector("#temperature");
let cityElement=document.querySelector("#your-city");
let descriptionElement=document.querySelector("#description");
let humidityElement=document.querySelector("#humidity");
let windElement=document.querySelector("#wind");


descriptionElement.innerHTML=response.data.weather[0].description;
temperatureElement.innerHTML=Math.round(response.data.main.temp);
cityElement.innerHTML=response.data.name;
humidityElement.innerHTML=response.data.main.humidity;
windElement.innerHTML=Math.round(response.data.wind.speed);
}

let apiKey ="a797ee45374c07f8f53469ef56ba3a8c"; 
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=Prague&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature); 