# countryCovidApi_netlify

## Table of Content
* [General Information](#general-information)
* [Key Functions](#key-functions)
* [Technologies](#technologies)
* [Project Purpose](#project-purpose)
* [Project Status](#project-status)
* [Setup](#setup)

## General Information

A frontend project that fetches multiple APIs information and compiling it into a single webpage. The webpage shall display an overview of the country's information, weather and covid status.

## Key Functions
The website key functions are as follows:
1.  Input country name in the search bar to find out more information about the country.
2.  Website display is responsive that will adjust base on different view ports displays.
3.  Fetches information from API base on country. API used are as follows:
      --> https://openweathermap.org/current#data
      --> https://restcountries.com/v3.1
      --> https://api.covid19api.com
      --> https://corona.lmao.ninja/v2/countries

## Technologies
1. Node.js
2. Cascading Style Sheets (CSS)
3. Javascript
4. Browserify
5. Mapbox
6. Chart.js (to display covid data)

## Project Purpose
The idea of the project is to obtain more experience in frontend development. The main objective is to get experience working with API and manipulating the API information. This is also the first time using css grid to adjust the display of the website base on different viewports instead of using CSS framworks such as bootstrap to gain more understand on how responsive website works. Lastly, project utilised the browserify package since there is no backend server for this project.

1. Main file is script.js file. bundle.js is linked to the main html file (index.html) due to the use of the browserify package. 
2. Main style sheet is style.css which contains all the styling of the webpage.
3. There is a main fetch function to call a country's information resides in script.js which call information from API: https://restcountries.com/v3.1. 
4. The main display function (displayCountry) reside in script.js. it displays the country information.
5. Other fetch functions reside in fetch.js file. These fetch functions are within the main display function as i6t uses the variables from the main display function (displayCountry), these function calls different APIs for weather and covid information.
6. Other display functuon resides in display.js file to display weather and covid information.
7. The charts for covid information reside in the chart.js file.


## Project Status
The project status is already deployed. The project have been deployed in netlify and functionality and responsiveness have been tested in multiple types of browser such as Chrome and Microsoft Edge.

## Setup
1. Open index.html file
2. Open dev tool console and type "fetchCountry("XXXXX")" (XXXXX = name of country) OR just key a country name in the search bar of the webpage.
3. Project have been launch in netlify (https://angry-lumiere-e582d5.netlify.app/)
