const { doughnutChart, myBarChart1, myBarChart2 } = require("./charts")
const { numberCommas, zoomSize } = require("./function")
const { mapApiKey } = require("./config")

module.exports.displayWeather = (data) => {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like } = data.main;
    const { speed } = data.wind;
    const { all } = data.clouds;

    document.querySelector('.city').textContent = name;
    document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector('.temp').textContent = Math.round(temp*10)/10 + '°C';
    document.querySelector('.description').textContent = description;
    document.querySelector('.feelsLike').textContent = "Feels like: " + Math.round(feels_like*10)/10 + '°C';
    document.querySelector('.humidity').textContent = "Humidity: " + humidity + '%';
    document.querySelector('.wind').textContent = "Wind Speed: " + speed + 'm/s';
    document.querySelector('.cloud').textContent = "Cloudiness: " + all + '%';
}

module.exports.displayMap = (countryLng , countryLat, area, capitalLng , capitalLat, capital) => {
    mapboxgl.accessToken = mapApiKey 

    const map = new mapboxgl.Map({ // display map info
        container: 'map',
        style: "mapbox://styles/mapbox/streets-v11",
        center: [ countryLng , countryLat ],
        zoom: zoomSize(area) // zoomsize function to indicate how much to zoom based on country's area. function can be found in function.js 
    })
    map.addControl(new mapboxgl.NavigationControl())
    const popup = new mapboxgl.Popup().setLngLat([ capitalLng , capitalLat ]).setHTML(`<span>${capital}</span>`).addTo(map).togglePopup;
}

module.exports.displayCovid = (countryData, globalData) => {
    const dateFormat = globalData.Date;
    const localCases = countryData.cases;
    const localDeaths = countryData.deaths;
    const localActive = countryData.active;
    const localRecovered = countryData.recovered;
    const globalCases = globalData.Global.TotalConfirmed
    const globalDeaths = globalData.Global.TotalDeaths

    const date = new Date(dateFormat);
    document.querySelector('.covidDate').textContent = date.toDateString();
    document.querySelector('.localCases').textContent = numberCommas(localCases);
    document.querySelector('.globalCases').textContent = numberCommas(globalCases);
    document.querySelector('.localDeaths').textContent = numberCommas(localDeaths);
    document.querySelector('.globalDeaths').textContent = numberCommas(globalDeaths);
    document.querySelector('.casePercent').textContent = ((localCases/globalCases)*100).toFixed(2) + "%";
    document.querySelector('.deathPercent').textContent = ((localDeaths/globalDeaths)*100).toFixed(2) + "%";

//////////////////////////// Properties for Doughnut Chart /////////////////////////////////

    document.getElementById('doughnutChart').remove(); // require to remove previously generated chart before generating a new chart.    
    let canvas1 = document.createElement('canvas');     
    canvas1.setAttribute('id','doughnutChart'); 
    document.querySelector('#card1').appendChild(canvas1); // append a new canvas element into div with id "card1"

    const ctx1 = document.getElementById('doughnutChart').getContext('2d');  // creating a new chart
    doughnutChart(ctx1, localDeaths, localActive, localRecovered)

//////////////////////////// Properties for Bar Chart1 /////////////////////////////////

    document.getElementById('barChart1').remove(); // require to remove previously generated chart before generating a new chart.
    let canvas2 = document.createElement('canvas');     
    canvas2.setAttribute('id','barChart1'); 
    document.querySelector('#card2').appendChild(canvas2); // append a new canvas element into div with id "card1"

    const ctx2 = document.getElementById("barChart1").getContext("2d");  // creating a new chart
    ctx2.canvas.width = 750; // sizing the chart
    ctx2.canvas.height = 150;
    myBarChart1(ctx2, globalCases, localCases)

//////////////////////////// Properties for Bar Chart2 /////////////////////////////////

    document.getElementById('barChart2').remove(); // require to remove previously generated chart before generating a new chart.
    let canvas3 = document.createElement('canvas');     
    canvas3.setAttribute('id','barChart2'); 
    document.querySelector('#card3').appendChild(canvas3); // append a new canvas element into div with id "card1"

    const ctx3 = document.getElementById("barChart2").getContext("2d");  // creating a new chart
    ctx3.canvas.width = 750; // sizing the chart
    ctx3.canvas.height = 150;
    myBarChart2(ctx3, globalDeaths, localDeaths)
}