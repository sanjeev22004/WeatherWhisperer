
const apiKey = "64ed0ef88481fa82331ff6db70896941";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

var searchBox = document.querySelector(".search input");
var searchBtn = document.querySelector(".search button");

async function fetchWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (response.status == 404) {
        if (!document.querySelector('.invalidCity')) {
            let errorDiv = document.createElement("div");
            errorDiv.classList.add("invalidCity");
            let text = document.createTextNode("Invalid city name");
            errorDiv.appendChild(text);
            errorDiv.style.fontSize = "40px";
            errorDiv.style.fontFamily = "Arial";
            errorDiv.style.fontWeight = "bold";

            const referenceElement = document.querySelector('.weather');
            referenceElement.insertAdjacentElement("beforebegin", errorDiv);

            document.querySelector(".weather_information").style.display = "none";
            document.querySelector(".weather").style.display = "none";
        }
    } else {
        if (document.querySelector('.invalidCity')) {
            document.querySelector('.invalidCity').remove();
        }
        var data = await response.json();

        document.querySelector(".country").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = `${data.main.temp}°C`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;
        document.querySelector(".weather img").src = "weather.webp";

        if (data.weather[0].main == "Rain") document.querySelector(".weather img").src = "https://th.bing.com/th/id/R.88890b5f03c8d9e5992b971cb9dde66f?rik=MrTZV4WRT9B9BA&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2010%2f03%2fforecast-icon-weather-symbols_217133.png&ehk=6P43xR4gc9nrec85yXKQlA9xJVyL8XDQ9Y4aoThMnzI%3d&risl=&pid=ImgRaw&r=0";
        if (data.weather[0].main == "Clear") document.querySelector(".weather img").src = "clear.png";
        if (data.weather[0].main == "Mist") document.querySelector(".weather img").src = "https://www.bing.com/images/search?view=detailV2&ccid=CycO5wY1&id=E683452C3DC82E0AAD06565C8639735A97D36239&thid=OIP.CycO5wY1cPpA1kafjbVCUgHaHa&mediaurl=https%3a%2f%2fcdn3.iconfinder.com%2fdata%2ficons%2fweather-free-1%2f32%2fWeather_Free_Filled_Outline_mist-weather-foggy-cloud-1024.png&exph=1024&expw=1024&q=image+of+diffrent+weather++mist+logo+i+want+to+use+in+website&simid=608044327545697905&FORM=IRPRST&ck=875107BACF5CA451F675CED1DB9E329C&selectedIndex=4&itb=1&ajaxhist=0&ajaxserp=0";

        document.querySelector(".weather_information").style.display = "flex";
        document.querySelector(".weather").style.display = "flex";
    }
}

searchBtn.addEventListener("click", () => {
    fetchWeather(searchBox.value);
});
