function getCopyrightDate() {
    var copyright = document.getElementById('trivia-game-footer');

    var todaysDate = new Date();
    copyright.innerHTML = 'Copyright ' + todaysDate.getFullYear();
}

