const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const cityInput = document.querySelector(".search-box input");
const weatherBox = document.querySelector(".weather-box");
const weatherDetail = document.querySelector(".weather-detaile");
const error404 = document.querySelector(".not-found");

function getWeatherData() {
    const APIKey = '99812e694d4adc260232061b311da07c';
    const city = cityInput.value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                console.error(`API Error: ${response.status}`);
                error404.classList.add('active');
                weatherDetail.classList.remove('active');
                weatherBox.classList.remove('active');
                return Promise.reject('Failed to fetch weather data');
            }
            return response.json();
        })
        .then(json => {
            console.log(json);
            if (json.cod === "404") {
                container.style.height = '400px';
                error404.classList.add('active');
                return;
            }
            
            weatherBox.classList.add('active');
            container.style.height = '555px';
            weatherDetail.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(".weather-box .temperature");
            const description = document.querySelector(".weather-title");
            const humidity = document.querySelector(".weather-detaile .humidity span");
            const wind = document.querySelector(".weather-detaile .wind span");

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'img/clear.png';
                    break;
                case 'Rain':
                    image.src = 'img/rain.jfif';
                    break;
                case 'Snow':
                    image.src = 'img/snow.jfif';
                    break;
                case 'Clouds':
                    image.src = 'img/my-cloud.jfif';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'img/mist.jfif';
                    break;
                default:
                    image.src = 'img/cloud.jfif';
                    break;
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;
        })
        .catch(err => {
            console.error(`Error: ${err}`);
            error404.classList.add('active');
        });
}


search.addEventListener('click', getWeatherData);


cityInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        getWeatherData();
    }
});
