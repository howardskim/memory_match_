$(document).ready(doThisWhenReady);
var imageArray = [{
        character: "dva",
        winGif: 'images/dva2.gif',
        url: 'dva.png',
        sound: 'dva.mp3'
    },
    {
        character: "genji",
        winGif: 'images/genji.gif',
        url: 'genji.png',
        sound: 'genji.mp3'
    },
    {
        character: "hanzo",
        winGif: 'images/hanzo.gif',
        url: 'hanzo.png',
        sound: 'hanzo.mp3'
    },
    {
        character: "junkrat",
        winGif: 'images/junkrat.gif',
        url: 'junkrat.png',
        sound: 'junkrat.mp3'
    },
    {
        character: "mercy",
        winGif: 'images/mercy.gif',
        url: 'mercy.png',
        sound: 'mercy.mp3'
    },
    {
        character: "pharah",
        winGif: 'images/pharah.gif',
        url: 'pharah.png',
        sound: 'pharah.mp3'
    },
    {
        character: "reaper",
        winGif: 'images/reaper.gif',
        url: 'reaper.png',
        sound: 'reaper.mp3'
    },
    {
        character: "roadhog",
        winGif: 'images/roadhog.gif',
        url: 'roadhog.png',
        sound: 'roadhog.mp3'
    },
    {
        character: "soldier",
        winGif: 'images/soldier.gif',
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

function doThisWhenReady() {
    var arrayWithDoublePictures = doubleImage(imageArray);
    var randomArray = randomizer(arrayWithDoublePictures)
    appendImages(randomArray);
    applyEventHandlers();

}

function applyEventHandlers() {
    $('.card').on('click', whenACardIsClicked)
    $('.modalResetButton').on('click', resetGame)
    $('.resetButton').on('click', resetGame);
    startStats();
    $(this).on('click', function (event) {
        if (event.target === myModal) {
            $(myModal).css('display', 'none');
        }
    })
}

function startStats() {
    times_played++;
    attempts = 0;
    var gamesPlayedDiv = $('.timesPlayed p');
    gamesPlayedDiv.text(`# of games played: ${times_played}`);
    var numberOfTriesDiv = $('.numberOfTries p');
    numberOfTriesDiv.text(`number of tries: ${attempts}`);
    var accuracyDiv = $('.accuracy');
    accuracyDiv.text('Accuracy' + ' 0 %');

}


function display_stats() {
    var gamesPlayedDiv = $('.timesPlayed p');
    gamesPlayedDiv.text(`# of games played: ${times_played}`);
    var numberOfTriesDiv = $('.numberOfTries p');
    numberOfTriesDiv.text(`number of tries: ${attempts}`);
    var accuracyDiv = $('.accuracy');
    var accuracyPercentage = Math.round((matches / attempts) * 100);
    accuracyDiv.text('Accurary: ' +accuracyPercentage + ' %')
};


function resetGame() {
    canIClick = true;
    startStats();
    $('.cardArea').empty();
    var arrayWithDoublePictures = doubleImage(imageArray);
    var randomArray = randomizer(arrayWithDoublePictures)
    appendImages(randomArray);
    total_possible_matches = 9;
    first_card_clicked = null;
    second_card_clicked = null;
    accuracy = 0;
    matches = 0;
    attempts = 0;
    match_counter = 0;
    $('.timesPlayed').text(`# of games played: ${times_played}`);
    $('.card').on('click', whenACardIsClicked)
    $('.card div').removeClass('showCharactersFace');
    var characterImageArea = $('.characterArea');
    characterImageArea.attr('src', '');
    $('#logoArea').attr('src', 'images/logo3.png')
    var modal = $('.modal');
    modal.css('display', 'none');
}

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

function win() {
    var accuracyPercentage = Math.round((matches / attempts) * 100);
    var modal = $('.modal');
    modal.css('display', 'block');
    var modalContent = $('.modal-content');
    modalContent.addClass('winBackground');
    $('.modal-content h1').text(`Congratulations! Your accuracy was around ${accuracyPercentage}%`);

}



function whenACardIsClicked() {

    var characterImageArea = $('.characterArea');
    var logoArea = $('#logoArea');
    if ($(this).find('.back').hasClass('showCharactersFace')) {
        return;
    }
    if (canIClick === false) {
        return;
    }
    if (first_card_clicked === null) {
        first_card_clicked = this;
        // $(first_card_clicked).addClass('flipCard')
        $(first_card_clicked).find(".back").addClass('showCharactersFace');
        return;
    } else {
        second_card_clicked = this;
        $(second_card_clicked).find(".back").addClass('showCharactersFace');
        canIClick = false;
        var firstCardImageURL = $(first_card_clicked).find('.front').attr('src');
        var secondCardImageURL = $(second_card_clicked).find('.front').attr('src');
        // if the cards ARE A MATCH
        if (firstCardImageURL === secondCardImageURL) {
            logoArea.attr('src', $(first_card_clicked).find('.front').attr('winGif')); // after the src, this is the SECOND parameter
            var characterSound = $(this).attr('sound');
            playSound(characterSound);
            attempts++;
            matches++;
            match_counter++;
            display_stats();
            if (matches === total_possible_matches) {
                setTimeout(win, 500)

            }
            first_card_clicked = null;
            second_card_clicked = null;
            canIClick = true;
        } else { // if the cards are NOT a match
            setTimeout(flipCardsBack, 2000);
            attempts++;
            display_stats();
        }
    }
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
        var divWithFrontClass = $('<img>', {
            class: 'back',
            attr: {
                src: `images/heroesbackofcard.jpg`
            }
        });

        // Example: <div class="front" wingif="images2/dva2.gif" style="background-image: url('images/dva.png')"></div>
        var divWithBackClass = $('<img>', {
            class: 'front',
            attr: {
                winGif: array[i].winGif,
                src: `images/${array[i].url}`
            }
        });
        newDiv.append(divWithBackClass, divWithFrontClass);
        $('.cardArea').append(newDiv);
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
    while (array.length > 0) {
        var randomIndex = Math.floor(Math.random() * array.length);
        randomArray.push(array.splice(randomIndex, 1)[0]);
    }
    return randomArray
}