function getCopyrightDate() {
    var copyright = document.getElementById('trivia-game-footer');

    var todaysDate = new Date();
    copyright.innerHTML = 'Developed by TCJR  &nbsp; &nbsp; Copyright ' + todaysDate.getFullYear();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var randomInt = Math.floor(Math.random() * (max - min)) + min;
    return randomInt;
}//The maximum is exclusive and the minimum is inclusive

function buildMultiChoiceArray (min, max, array) {
    var guessArray = [];
    for (i = 0; i < 3; i++) {
        var index = getRandomInt(min, max);
        guessArray.push(array[index]);
        console.log("array element ",i," is ",guessArray[i]);
    }
    return guessArray;
}

function getRandomCountry(min, max, array) {
    var index = getRandomInt(min, max);
    var iso = array[index];
    return iso;
}

function writeToScreen(htmlSelector, newValue) {
    if (typeof(newValue) === 'object') {
        $(htmlSelector).text(newValue.join(' '));
    }
    else {
        $(htmlSelector).text(newValue);
    }
}//One f(x) to handle all of the screen printing capabilities


const movieTrivia = "#movies";
const geographyTrivia = "#geography";
const popHTML = "#population";
const gdpHTML = "#gdp";
const gnpHTML = "#gnp";


var internetCvg = 0;
var mobileCvg = 0;
var randomCountry = "gha";
var multiChoiceArray = [];


var countries = {
    desc: "This category features countries from the African continent. How well do you know your world geography.",
    isoCodeArray: ["sen", "gin", "sle", "civ", "gha", "mrt", "nga", "tcd", "mli", "esh", "eri",
               "mar", "dza", "tun", "lby", "egy", "sdn", "eth", "som", "ken", "uga", "cod",
               "caf", "cmr", "cog", "gab", "tza", "mwi", "zmb", "ago", "nam", "bwa", "zwe", 
               "moz","mdg", "zaf"],

    countryArray: ["SENEGAL","GUINEA","SIERRA LEONE","IVORY COAST", "GHANA","MAURITANIA", "NIGERIA","CHAD","MALI","WESTERN SAHARA",
                   "ERITRIA","MOROCCO","ALGERIA","TUNISIA","LYBIA","EGYPT","SUDAN","ETHIOPIA","SOMALIA","KENYA","UGANDA",
                   "DEMOCRATIC REPUBLIC OF THE CONGO","CENTRAL AFRICAN REPUBLIC","CAMEROON","CONGO","GABON","TANZANIA","MALAWI","ZAMBIA",
                   "ANGOLA","NAMIBIA","BOTSWANA","ZIMBABWE","MOZAMBIQUE","MADAGASCAR","SOUTH AFRICA"],

    countryGDP: 0,
    countryPop:  0,
    countryGNP: 0,
    countryName: "",
    
    getPopulationData: function() {
        popQueryURL = "http://api.worldbank.org/v2/countries/" + randomCountry + "/indicators/SP.POP.TOTL?date=2016&format=json";
        $.ajax({
            url: popQueryURL,
            method: "GET"
          }).then(function(response) {
            countryPop = response[1][0].value;
            countryName = response[1][0].country.value;
            multiChoiceArray.push(countryName);
            console.log(multiChoiceArray);
            console.log(response);
            console.log("Number of people ", countryPop);
            writeToScreen(popHTML, countryPop.toLocaleString());
            console.log(countryName);
        });
    },

    getGDPData: function() {
        gdpQueryURL = "http://api.worldbank.org/v2/countries/" + randomCountry + "/indicators/NY.GDP.MKTP.CD?date=2016&format=json";
        $.ajax({
            url: gdpQueryURL,
            method: "GET"
          }).then(function(response) {
            countryGDP = response[1][0].value;
            console.log(response);
            console.log("GDP IS ", countryGDP);
            writeToScreen(gdpHTML, countryGDP.toLocaleString());
        });
    },

    getGNPData: function() {
        gniQueryURL = "http://api.worldbank.org/v2/countries/" + randomCountry + "/indicators/NY.GNP.PCAP.CD/?date=2016&format=json";
        $.ajax({
            url: gniQueryURL,
            method: "GET"
          }).then(function(response) {
            countryGNP = response[1][0].value;
            console.log(response);
            console.log("GNP IS ", countryGNP);
            writeToScreen(gnpHTML, countryGNP.toLocaleString());
        });
    }
};

$(document).ready(function() {
    $(movieTrivia).on("click", function(event) {
        alert("Not yet implemented. Click geography!");
    });

    $(geographyTrivia).on("click", function(event) {
        $(".jumbotron-buttons").hide();
        randomCountry = getRandomCountry(0,countries.isoCodeArray.length,countries.isoCodeArray);
        console.log("Updated country code is", randomCountry);
        multiChoiceArray = buildMultiChoiceArray(0,countries.countryArray.length,countries.countryArray);
        countries.getPopulationData();
        countries.getGDPData();
        countries.getGNPData();
    });
});
