const { displayWeather, displayCovid } = require('./display')

module.exports.fetchWeather = (capital) => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + capital + "&units=metric&appid=a53932e7949e91d6083eb23afd4574a3")
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