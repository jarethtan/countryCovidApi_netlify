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
    fetch("https://corona.lmao.ninja/v2/countries/" + country + "?yesterday&strict&query%20") // fetch function to get country data for covid
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
        return fetch("https://api.covid19api.com/summary") // nested fetch function within another fetch function to get global data for covid
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