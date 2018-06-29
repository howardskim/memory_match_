$(document).ready(doThisWhenReady);
var imageArray = [{
        character: "dva",
        winGif: 'images2/dva2.gif',
        url: 'dva.png',
        sound: 'dva.mp3'
    },
    {
        character: "genji",
        winGif: 'images2/genji.gif',
        url: 'genji.png',
        sound: 'genji.mp3'
    },
    {
        character: "hanzo",
        winGif: 'images2/hanzo.gif',
        url: 'hanzo.png',
        sound: 'hanzo.mp3'
    },
    {
        character: "junkrat",
        winGif: 'images2/junkrat.gif',
        url: 'junkrat.png',
        sound: 'junkrat.mp3'
    },
    {
        character: "mercy",
        winGif: 'images2/mercy.gif',
        url: 'mercy.png',
        sound: 'mercy.mp3'
    },
    {
        character: "pharah",
        winGif: 'images2/pharah.gif',
        url: 'pharah.png',
        sound: 'pharah.mp3'
    },
    {
        character: "reaper",
        winGif: 'images2/reaper.gif',
        url: 'reaper.png',
        sound: 'reaper.mp3'
    },
    {
        character: "roadhog",
        winGif: 'images2/roadhog.gif',
        url: 'roadhog.png',
        sound: 'roadhog.mp3'
    },
    {
        character: "soldier",
        winGif: 'images2/soldier.gif',
        url: 'soldier.png',
        sound: 'soldier.mp3'
    },
]

//Global Variables//
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var times_played = 0;
var canIClick = true;

function display_stats() {
    var gamesPlayedDiv = $('.timesPlayed p');
    gamesPlayedDiv.text(`# of games played: ${times_played}`);
    var numberOfTriesDiv = $('.numberOfTries');
    numberOfTriesDiv.text(`number of tries: ${attempts}`);
    var accuracyDiv = $('.accuracy');
    accuracyDiv.text(`Accuracy: ${accuracy}%`);
};

function reset_stats() {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    match_counter = 0;
    display_stats();
};

function resetGame() {
    times_played++;
    $('.timesPlayed').text(`# of games played: ${times_played}`);
    first_card_clicked = null;
    second_card_clicked = null;
    $('.card div').removeClass('showCharactersFace');
    $('.rowOne').empty();
    var arrayWithDoublePictures = doubleImage(imageArray);
    var randomArray = randomizer(arrayWithDoublePictures)
    appendImages(randomArray);
    $('.card').on('click', whenACardIsClicked)
    canIClick = true;
    display_stats();
    var characterImageArea = $('.characterArea');
    characterImageArea.attr('src', '')

}

function doThisWhenReady() {
    var arrayWithDoublePictures = doubleImage(imageArray);
    var randomArray = randomizer(arrayWithDoublePictures)
    appendImages(randomArray);
    eventHandler();
    display_stats();

}

function eventHandler() {
    $('.card').on('click', whenACardIsClicked)
    $('.resetButton').on('click', resetGame);
};

function flipCardsBack() {
    $(first_card_clicked).find(".back").removeClass('showCharactersFace');
    $(second_card_clicked).find(".back").removeClass('showCharactersFace');
    first_card_clicked = null;
    second_card_clicked = null;
    canIClick = true;
};

function playSound(mp3) {
    var audio = new Audio(`./sounds/${mp3}`);
    audio.play();
}

function win(){

}
function whenACardIsClicked() {
    var characterImageArea = $('.characterArea');
    if ($(this).find('.back').hasClass('showCharactersFace')) {
        return;
    }
    if (canIClick === false) {
        return;
    }
    if (first_card_clicked === null) {
        first_card_clicked = this;
        $(first_card_clicked).find(".back").addClass('showCharactersFace');
        return;
    } else {
        second_card_clicked = this;
        $(second_card_clicked).find(".back").addClass('showCharactersFace');
        canIClick = false;
        var firstCardImageURL = $(first_card_clicked).find('.front').css('background-image');
        var secondCardImageURL = $(second_card_clicked).find('.front').css('background-image');
        // if the cards ARE A MATCH
        if (firstCardImageURL === secondCardImageURL) { 
            characterImageArea.attr('src', $(first_card_clicked).find('.front').attr('winGif')); // after the src, this is the SECOND parameter
            var characterSound = $(this).attr('sound');
            playSound(characterSound);
            matches++;
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            canIClick = true;
        } else { // if the cards are NOT a match
            setTimeout(flipCardsBack, 2000);
            attempts++;
        }
    }
    accuracy = ((matches / attempts) * 100).toPrecision(2);
    display_stats();
};

function appendImages(array) {
    for (var i = 0; i < array.length; i++) {
        // Example: <div class="card" sound="dva.mp3"></div> //
        var newDiv = $('<div>', {
            class: 'card',
            attr: {
                sound: array[i].sound
            }
        });

        // Example: <div class="back" style="background-image: url('images/frontcard.jpg')"></div>
        var divWithFrontClass = $('<div>', {
            class: 'back',
            attr: {
                style: `background-image: url('images/frontcard.jpg')`
            }
        });

        // Example: <div class="front" wingif="images2/dva2.gif" style="background-image: url('images/dva.png')"></div>
        var divWithBackClass = $('<div>', {
            class: 'front',
            attr: {
                winGif: array[i].winGif,
                style: `background-image: url('images/${array[i].url}')`
            }
        });
        newDiv.append(divWithFrontClass, divWithBackClass);
        $('.rowOne').append(newDiv);
    };
}

function doubleImage(array) {
    var arrayWithDoublePictures = [];
    for (var i = 0; i < array.length; i++) {
        arrayWithDoublePictures.push(array[i], array[i])
    }
    return arrayWithDoublePictures;
}

function randomizer(array) {
    var randomArray = [];
    var copiedArray = array.slice(0);
    while (copiedArray.length > 0) {
        var randomIndex = Math.floor(Math.random() * copiedArray.length);
        randomArray.push(copiedArray.splice(randomIndex, 1)[0]);
    }
    return randomArray
}