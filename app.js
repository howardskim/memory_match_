$(document).ready(doThisWhenReady);
//testinggggggggggggggggggggggggggggggggggggggggg//
var imageArray = ['dva.png', 'genji.png', 'hanzo.png', 'junkrat.png', 'mercy.png', 'pharah.png', 'reaper.png', 'roadhog.png', 'soldier.png'];;;
// var imageArray = ['dva.png', 'genji.png', 'reaper.png']
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var times_played = 0;

function display_stats(){
    var gamesPlayedDiv = $('.timesPlayed p');
    gamesPlayedDiv.text(`# of games played ${times_played}`);
    var numberOfTriesDiv = $('.numberOfTries');
    numberOfTriesDiv.text(`number of tries: ${attempts}`);
    var accuracyDiv = $('.accuracy');
    accuracyDiv.text(`Accuracy: ${accuracy}%`);
};

function reset_stats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    match_counter = 0;
    display_stats();


};

function resetGame(){
    times_played++;
    // console.log('times played = ' + times_played);
    $('.timesPlayed').text(`# of games played: ${times_played}`);
    first_card_clicked = null;
    second_card_clicked = null;
    $('.card div').removeClass('showCharactersFace');
    reset_stats();

}
function doThisWhenReady(){
    var arrayWithDoublePictures = doubleImage(imageArray);
    var randomArray = randomizer(arrayWithDoublePictures)
    appendImages(randomArray);
    eventHandler();
    display_stats();
}
function eventHandler(){
    $('.card').on('click', whenACardIsClicked)
    $('.resetButton').on('click', resetGame);
};
function flipCardsBack(){
    $(first_card_clicked).find(".back").removeClass('showCharactersFace');
    $(second_card_clicked).find(".back").removeClass('showCharactersFace');
    first_card_clicked = null;
    second_card_clicked = null;
}
function whenACardIsClicked() {
    if ($(this).find('.back').hasClass('showCharactersFace')) {
        // console.log('you have been clicked')
        return;
    }
    if (first_card_clicked !== null && second_card_clicked !== null){
        return;
    }
    if(first_card_clicked === null){
        first_card_clicked = this;

        
        $(first_card_clicked).find(".back").addClass('showCharactersFace');
        return;
    } else { 
        second_card_clicked = this;


        $(second_card_clicked).find(".back").addClass('showCharactersFace');
        var firstCardImageURL = $(first_card_clicked).find('.front').css('background-image');
        var secondCardImageURL = $(second_card_clicked).find('.front').css('background-image');
        if(firstCardImageURL === secondCardImageURL){ // if the cards ARE A MATCH
            matches++;
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
        } else { // if the cards are NOT a match
            setTimeout(flipCardsBack, 2000);
            attempts++;
        }
    }
    accuracy = (matches/attempts).toFixed(2) * 100;
    display_stats();
};

function appendImages(array){
    for(var i = 0; i < array.length; i++){
        var newDiv = $('<div>', {
            class: 'card'
        });
        var divWithFrontClass = $('<div>', {
            class: 'back',
            attr: {
              style: `background-image: url('images/frontcard.jpg')`
            }
        });
        var divWithBackClass = $('<div>', {
            class: 'front' ,
            attr: {
                style: `background-image: url('images/${array[i]}')`
            }
        });
        newDiv.append(divWithFrontClass, divWithBackClass);
        $('.rowOne').append(newDiv);
    };
}

function doubleImage(array){
    var arrayWithDoublePictures = [];
    for(elem of array){
        arrayWithDoublePictures.push(elem, elem)
    }
    return arrayWithDoublePictures;
}
function randomizer(array){
    var randomArray = [];
    var copiedArray = array.slice(0);
    while(copiedArray.length > 0){
        var randomIndex = Math.floor(Math.random() * copiedArray.length);
        randomArray.push(copiedArray.splice(randomIndex, 1)[0]);
    }
    return randomArray
}
