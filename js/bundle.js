(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
///////////////////////////////////////////////////////////////// Display Doughnut Chart ///////////////////////////////////////////////////////////////////////////////////

module.exports.doughnutChart = (ctx, localDeaths, localActive, localRecovered) => {
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Death', 'Active', 'Recovered' ],
            datasets: [{
                label: 'Country Breakdown',
                data: [localDeaths, localActive, localRecovered],
                backgroundColor: [
                    'rgb(255, 23, 68)',
                    'rgb(255, 111, 0)',
                    'rgb(0, 200, 83)',
                ],
                borderColor: [
                    'rgb(255, 23, 68)',
                    'rgb(255, 111, 0)',
                    'rgb(0, 200, 83)',
                ],
                borderWidth: 1,
                hoverOffset: 10,
                cutout: "55%",
            }]
        },
        options: {
            animation: {
                animateRotate: true,
                duration: 1800
            },
            plugins: {
                legend: {
                    labels: {
                        generateLabels: (chart) => {
                            const datasets = chart.data.datasets;
                            const totalCase = countryData.cases; 
                            return datasets[0].data.map((data, i) => ({
                                text: `${chart.data.labels[i]} (${((data/totalCase)*100).toFixed(1)}%)`,
                                fillStyle: datasets[0].backgroundColor[i],
                            }))
                        },
                        color: "black",
                        padding: 5,
                        boxWidth: 20,
                        font: {
                        size: 13
                        },
                    },
                    align: 'start',
                }
            },
        },
        plugins: [{
            id: 'text',
            beforeDraw: function(chart, a, b) {
                const width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
        
                ctx.restore();
                const fontSize = (height / 220).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";
        
                const text1 = ("Country"),
                text1X = Math.round((width - ctx.measureText(text1).width) / 2),
                text1Y = height / 1.9;
                const text2 = ("Breakdown"),
                text2X = Math.round((width - ctx.measureText(text2).width) / 2),
                text2Y = height / 1.6;
        
                ctx.fillText(text1, text1X, text1Y);
                ctx.fillText(text2, text2X, text2Y);
                ctx.save();
            }
        }]
    })
}

///////////////////////////////////////////////////////////////// Display Bar Chart1 ///////////////////////////////////////////////////////////////////////////////////

module.exports.myBarChart1 = (ctx, globalCases, localCases) => { 
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Cases"],
            datasets: [{
                indexAxis: 'y',
                label: "First",
                backgroundColor: 'rgb(255, 145, 0)', // Orange global case
                borderWidth: 1,
                data: [globalCases],
                barThickness: 54,
                order:2
            }, {
                indexAxis: 'y',
                label: "Second",
                backgroundColor: 'rgb(255, 234, 0)', // Yellow local cases
                borderWidth: 1,
                data: [localCases],
                barThickness: 32,
                order:1
            }],
        },
        options: {
            animation: {
                duration: 1800
            },
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    stacked: false,
                    ticks: {
                        callback: function(value, index, values) {
                            return value/1000000 + ('mil');
                            },
                            color: 'black'
                        },
                    },
                y: {
                    stacked: true,
                }
            }
        },
    })
}

///////////////////////////////////////////////////////////////// Display Bar Chart2 ///////////////////////////////////////////////////////////////////////////////////

module.exports.myBarChart2 = (ctx, globalDeaths, localDeaths) => {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Deaths"],
            datasets: [{
                indexAxis: 'y',
                label: "First",
                backgroundColor: 'rgb(255, 145, 0)', // Orange global case
                borderWidth: 1,
                data: [globalDeaths],
                barThickness: 54,
                order:2
            }, {
                indexAxis: 'y',
                label: "Second",
                backgroundColor: 'rgb(255, 234, 0)', // Yellow local cases
                borderWidth: 1,
                data: [localDeaths],
                barThickness: 32,
                order:1
            }],
            hoverOffset: 10,
        },
        options: {
            animation: {
                duration: 1800
            },
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                x: {
                    stacked: false,
                    ticks: {
                        callback: function(value, index, values) {
                            return value/1000000 + ('mil');
                            },
                        color: 'black'
                        }
                    },
                y: {
                    stacked: true,
                }
            }
        },
    });
}
},{}],2:[function(require,module,exports){
const mapApiKey = "pk.eyJ1IjoiamFyZXRodGFuIiwiYSI6ImNrdWQ0czNxajE3NTEyb21veXUwczE1ODEifQ.Yi3oFKpzaMkVVW3OYObKGA";
const weatherApiKey = "a53932e7949e91d6083eb23afd4574a3";

exports.mapApiKey = mapApiKey;
exports.weatherApiKey = weatherApiKey;
},{}],3:[function(require,module,exports){
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
        zoom: zoomSize(area)
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

    document.getElementById('doughnutChart').remove();     
    let canvas1 = document.createElement('canvas');     
    canvas1.setAttribute('id','doughnutChart'); 
    document.querySelector('#card1').appendChild(canvas1);

    const ctx1 = document.getElementById('doughnutChart').getContext('2d');
    doughnutChart(ctx1, localDeaths, localActive, localRecovered)

//////////////////////////// Properties for Bar Chart1 /////////////////////////////////

    document.getElementById('barChart1').remove();   
    let canvas2 = document.createElement('canvas');     
    canvas2.setAttribute('id','barChart1'); 
    document.querySelector('#card2').appendChild(canvas2);

    const ctx2 = document.getElementById("barChart1").getContext("2d");
    ctx2.canvas.width = 750;
    ctx2.canvas.height = 150;
    myBarChart1(ctx2, globalCases, localCases)

//////////////////////////// Properties for Bar Chart2 /////////////////////////////////

    document.getElementById('barChart2').remove();   
    let canvas3 = document.createElement('canvas');     
    canvas3.setAttribute('id','barChart2'); 
    document.querySelector('#card3').appendChild(canvas3);

    const ctx3 = document.getElementById("barChart2").getContext("2d");
    ctx3.canvas.width = 750;
    ctx3.canvas.height = 150;
    myBarChart2(ctx3, globalDeaths, localDeaths)
}
},{"./charts":1,"./config":2,"./function":5}],4:[function(require,module,exports){
const { displayWeather, displayCovid } = require('./display')
const { weatherApiKey } = require("./config")

module.exports.fetchWeather = (capital) => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + capital + "&units=metric&appid=" + weatherApiKey)
    .then(res => {
        if (res.ok) {
            console.log('Successfully retrieve weather API info');
            return res.json()
        }
        else {
            console.log('Unscuccessful connection with weather API');
            return Promise.reject(res);
        }
    })
    .then(data => displayWeather(data))
    .catch(err => console.log("Error: ", err))
}

module.exports.fetchCovid = (country) => {
    fetch("https://corona.lmao.ninja/v2/countries/" + country + "?yesterday&strict&query%20")
    .then(res => {
        if (res.ok) {
            console.log(`Successfully retrieve ${country}'s Covid-19 API info`);
            return res.json()
        }
        else {
            console.log(`Unscuccessful connection with Covid-19 API for ${country}`);
            return Promise.reject(res);
        }
        })
    .then(data => { 
        countryData = data;
        return fetch("https://api.covid19api.com/summary")
    })
    .then(res => {
        if (res.ok) {
            console.log('Successfully retrieve global Covid-19 API info');
            return res.json()
        }
        else {
            console.log('Unscuccessful connection with global Covid-19 API');
            return Promise.reject(res);
        }
    })
    .then(globalData => displayCovid(countryData, globalData))
    .catch(err => console.log("Error: ", err))
}
},{"./config":2,"./display":3}],5:[function(require,module,exports){
module.exports.numberCommas = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

module.exports.zoomSize = (area) => {
    if (area < 5000) return 9
    else if(area < 50000) return 7.2
    else if(area < 1200000) return 3.5
    else if(area < 3000000) return 2.7
    else if(area < 5000000) return 2.3
    else return 1.9
} 
},{}],6:[function(require,module,exports){
const {numberCommas} = require("./function")
const { fetchWeather, fetchCovid } = require("./fetch")
const { displayMap } = require('./display')

let country = {
    fetchCountry: function(country) {
        fetch("https://restcountries.com/v3.1/name/" + country)
        .then(res => {
            if (res.ok) {
                console.log('Successfully retrieve countries API info');
                return res.json()
            }
            else {
                console.log('Unscuccessful connection with countries API');
                return Promise.reject(res);
            }
        })
        .then(data => this.displayCountry(data))
        .catch(err => console.log("Error", err))
    },
    displayCountry: function(data) {
        const { common, official } = data[0].name;
        const flag = data[0].flags.png;
        const coatOfArms = data[0].coatOfArms.png;
        const capital = data[0].capital;
        const continent = data[0].continents;
        const subregion = data[0].subregion;
        const area = data[0].area;
        const currencies = data[0].currencies
        const currenciesName = Object.values((Object.values(currencies))[0])[0];
        const independence = data[0].independent;
        const population = data[0].population;
        const languages = data[0].languages;
        const countryLat = data[0].latlng[0];
        const countryLng = data[0].latlng[1];
        const capitalLat = data[0].capitalInfo.latlng[0];
        const capitalLng = data[0].capitalInfo.latlng[1];

        const country = document.querySelectorAll('.countryName');
        country.forEach(function(item) {
            item.textContent = common;
        });
        document.querySelector('.officialName').textContent = official;
        document.querySelector('.flagPic').src = flag;
        document.querySelector('.codeOfArms').src = coatOfArms;
        document.querySelector('.capital').textContent = capital;
        document.querySelector('.region').textContent = continent;
        document.querySelector('.subregion').textContent = subregion;
        document.querySelector('.area').textContent = numberCommas(area);
        document.querySelector('.currency').textContent = Object.keys(currencies).join(', ');
        document.querySelector('.currencyName').textContent = currenciesName;
        document.querySelector('.languages').textContent = Object.values(languages).join(' / ');
        document.querySelector('.independent').textContent = independence ? "Yes" : "No";
        document.querySelector('.population').textContent = numberCommas(population);
      
        fetchWeather(capital[0]) // fetch weather info and display

        displayMap(countryLng , countryLat, area, capitalLng , capitalLat, capital) // display map info.

        fetchCovid(common) // fetch covid info and display

        const loadingInfo = document.querySelectorAll('.load');
        loadingInfo.forEach(function(item) {
            item.classList.remove('loading')
        })
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + capital + "')" // display background pic related to country
    },
    search: function () { // search function 
        this.fetchCountry(document.querySelector("#searchInput").value)
    }
}
document.querySelector(".search button").addEventListener("click", function() {
        country.search();
})

document.querySelector("#searchInput").addEventListener("keyup", function(input) {
    if(input.key == "Enter") country.search();
})

window.country = country // access country as global variable when applying browserify.


  


},{"./display":3,"./fetch":4,"./function":5}]},{},[6]);
