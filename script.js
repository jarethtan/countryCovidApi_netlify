const {numberCommas, zoomSize} = require("./function")
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


  

