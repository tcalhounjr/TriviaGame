function getCopyrightDate() {
    var copyright = document.getElementById('trivia-game-footer');

    var todaysDate = new Date();
    copyright.innerHTML = 'Copyright ' + todaysDate.getFullYear() + ' TCJR';
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var randomInt = Math.floor(Math.random() * (max - min)) + min;
    return randomInt;
}//The maximum is exclusive and the minimum is inclusive

function buildMultiChoiceArray (min, max, array) {
    var guessArray = [];
    array = shuffle(array);
    for (i = 0; i < 3; i++) {
        var index = getRandomInt(min, max);
        guessArray.push(array[index]);
        console.log("array element ",i," is ",guessArray[i]);
    }
    return guessArray;
}

function initializeGame() {
    countries.getPopulationData();
    countries.getGDPData();
    countries.getGNPData();
    console.log('Initialize game multi choice array ',multiChoiceArray);
}

function getRandomCountry(min, max, array) {
    var index = getRandomInt(min, max);
    array = shuffle(array);
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

function buildGameBoard(gameArray) {
    gameArray = shuffle(gameArray);
    console.log('The gameArray has ',gameArray.length, ' elements');
    var gameElement = 1;
    for (var i = 0; i < gameArray.length; i++) {
        var divHTML = $("<div class='radio'>");
        var labelHTML = $("<label class='radio-label'>");
        var radioHTML = $("<input type='radio' name='optionsRadios'>");
        divHTML.appendTo(radioDIV);
        labelHTML.appendTo(divHTML);
        radioHTML.prependTo(divHTML);
        
        radioHTML.attr('id', 'optionsRadios' + gameElement);
        radioHTML.attr('value', gameArray[i]);
        labelHTML.text(gameArray[i]);
        console.log(gameElement, ' loop');
        gameElement++;
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
//$(labelHTML).appendTo(".radio");

const movieTrivia = "#movies";
const geographyTrivia = "#geography";
const popHTML = "#population";
const gdpHTML = "#gdp";
const gnpHTML = "#gnp";
const radioDIV = $(".radio-container");

var randomCountry = "gha";
var multiChoiceArray = [];

var countries = {
    desc: "This category features countries from the African continent. How well do you know your world geography.",
    isoCodeArray: ["sen", "gin", "sle", "civ", "gha", "mrt", "nga", "tcd", "mli", "esh", "eri",
               "mar", "dza", "tun", "lby", "egy", "sdn", "eth", "som", "ken", "uga", "cod",
               "caf", "cmr", "cog", "gab", "tza", "mwi", "zmb", "ago", "nam", "bwa", "zwe", 
               "moz","mdg", "zaf"],

    countryArray: ["Senegal","Guinea","Sierra Leone","Ivory Coast", "Ghana","Mauritania", "Nigeria","Chad","Mali","Western Sahara",
                   "Eritrea","Morocco","Algeria","Tunisia","Lybia","Egypt","Sudan","Ethiopia","Somalia","Kenya","Uganda",
                   "Democratic Republic of the Congo","Central African Republic","Cameroon","Congo","Gabon","Tanzania","Malawi","Zambia",
                   "Angola","Namibia","Botswana","Zimbabwe","Mozambique","Madagascar","South Africa"],

    countryGDP: 0,
    countryPop:  0,
    countryGNP: 0,
    countryName: "",
    
    getPopulationData: function() {
        popQueryURL = "https://api.worldbank.org/v2/countries/" + randomCountry + "/indicators/SP.POP.TOTL?date=2016&format=json";
        console.log(popQueryURL);
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
            buildGameBoard(multiChoiceArray);
        });
    },

    getGDPData: function() {
        gdpQueryURL = "https://api.worldbank.org/v2/countries/" + randomCountry + "/indicators/NY.GDP.MKTP.CD?date=2016&format=json";
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
        gniQueryURL = "https://api.worldbank.org/v2/countries/" + randomCountry + "/indicators/NY.GNP.PCAP.CD/?date=2016&format=json";
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
        alert("Not yet implemented. Check back later for an updated version. In the meantime, click geography!");
    });

    $(geographyTrivia).on("click", function(event) {
        $(".jumbotron-buttons").hide();
        randomCountry = getRandomCountry(0,countries.isoCodeArray.length,countries.isoCodeArray);
        console.log("Updated country code is", randomCountry);
        multiChoiceArray = buildMultiChoiceArray(0,countries.countryArray.length,countries.countryArray);
        console.log('Multiple choice array ', multiChoiceArray);
        initializeGame();
    });
});
