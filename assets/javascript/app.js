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

function getCPUGuess (min, max, array) {
    var index = getRandomInt(min, max);
    var guessStr = array[index];
    var guessArray = [];
    for (i = 0; i < guessStr.length; i++) {
        if (guessStr.charAt(i) === " ") {
            guessArray.push(" ");
        }
        else {
            guessArray.push(guessStr.charAt(i));
        }
    }
    return guessArray;
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

var countries = {
    desc: "This category features countries from the African continent. How well do you know your world geography.",
    gameArray: ["SENEGAL", "GUINEA", "SIERRA LEONE", "IVORY COAST", "GHANA", "MAURITANIA", "BURKINA", "NIGER", "NIGERIA", "CHAD", "MALI", "WESTERN SAHARA", 
               "MOROCCO", "ALGERIA", "TUNISIA", "LIBYA", "EGYPT", "SUDAN", "ETHIOPIA", "SOMALIA", "KENYA", "UGANDA", "DEMOCRATIC REPUBLIC OF THE CONGO",
               "CENTRAL AFRICAN REPUBLIC", "CAMEROON", "CONGO", "GABON", "TANZANIA", "MALAWI", "ZAMBIA", "ANGOLA", "NAMIBIA", "BOTSWANA", "ZIMBABWE", 
               "MOZAMBIQUE","MADAGASCAR", "SOUTH AFRICA"],
    queryURL: "http://api.worldbank.org/v2/indicators?format=json",
    
    getWorldBankData: function() {
        $.ajax({
            url: this.queryURL,
            method: "GET"
          }).then(function(response) {
            var countryData = response;
            console.log(countryData);
        });
    }
};

$(document).ready(function() {
    $(movieTrivia).on("click", function(event) {
        alert("Not yet implemented. Click geography!");
    });

    $(geographyTrivia).on("click", function(event) {
        $(".jumbotron-buttons").hide();
        countries.getWorldBankData();
    });
});
