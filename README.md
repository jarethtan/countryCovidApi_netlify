# countryCovidApi_netlify 

 

## Table of Content 

* [General Information](#general-information) 

* [Key Functions](#key-functions) 

* [Technologies](#technologies) 

* [Project Description](#project-description) 

* [Project Status](#project-status) 

* [Setup](#setup) 

 

## General InformationA 

 

This website was created to fetch API information from different APIs database.The website displays the country's information, weather and covid status. 

 

## Key Functions 

The website key functions are as follows: 

1. Display country's information, weather and covid status. 

2. Website is responsive and adjust display to accomodate different view ports. 

3. Map display country and country's capital location. 

4. Display APIs from: 

   --> https://restcountries.com/v3.1 

   --> https://api.openweathermap.org 

   --> https://corona.lmao.ninja 

   --> https://api.covid19api.com 

 

 

## Technologies 

1. Browserify 

2. Cascading Style Sheets (CSS) 

3. Javascript 

4. MapBox 

5. Chart.js 

 

 

## Project Description 

The general idea of the project was to create a frontend project to work with API information such as fetching the API information and manipulating the information. The project explores the functionalities of fetch(). The project also uses grid display to create a responsive website instead of using CSS frameworks such as bootstrap to obtain a better understanding on how responsive functionality works. Lastly, the project also uses libraries such as chart.js and browserify to improve the data visualisation and compartmentalizing the code.    

 

1. Main file is situated in script.js file.  

2. Due to using the browserify package to use function such as "require" and "exports", bundle.js and script.js are linked. 

3. bundle.js file is linked to the main HTML file (index.js).  

4. In the main script file, you will find a main fetch function (fetchCountry) and main display function (displayCountry) 

5. Within the main display function (displayCountry), there are multiple fetch function in it because we are using the variable generated from the main display function (displayCountry) as input into other APIs such as weather and covid information. 

6. The other fetch functions (fetchWeather and fetchCovidInfo) reside in the fetch.js file.  

7. In fetchCovidInfo, there is a nested fetch call function.  

8. The display functions reside in display.js file. In "displayCovid" function, there are charts residing in the function to display. 

9. The main styling file is style.css 

10. All the charts generated from covid information resides in chart.js 

 

## Project Status 

The project status is ready for deployment. The project has been deployed in netlify and functionality have been tested in multiple types of browsers such as Chrome and Microsoft Edge for responsiveness. 

 

## Setup 

1. Open index.html file. 

2. Open Chrome dev tools console and key in (fetchCountry("XXXXXX") (XXXXXX = country name) OR key country name in search bar. 

3. Project have been launched in netlify (https://angry-lumiere-e582d5.netlify.app) 
