$(document).ready(doThisWhenReady);
//testinggggggggggggggggggggggggggggggggggggggggg//
var imageArray = ['dva.png', 'genji.png', 'hanzo.png', 'junkrat.png', 'mercy.png', 'pharah.png', 'reaper.png', 'roadhog.png', 'soldier.png'];;;
// var imageArray = ['dva.png', 'genji.png', 'reaper.png']
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

function doThisWhenReady(){
    var arrayWithDoublePictures = doubleImage(imageArray);
    var randomArray = randomizer(arrayWithDoublePictures)
    appendImages(randomArray);
    eventHandler();
}
function eventHandler(){
    $('.card').on('click', whenACardIsClicked)
};
function flipCardsBack(){
    $(first_card_clicked).find(".front").removeClass('hidden');
    $(second_card_clicked).find(".front").removeClass('hidden');
    first_card_clicked = null;
    second_card_clicked = null;
    // $('.card').on('click', whenTheFrontCardIsClicked);
}
function whenACardIsClicked() {

    //if the character card is revealed and the logo becomes hidden, break out of the function
    if ($(this).find('.front').hasClass('hidden')) { 
        console.log('hit')
        return;
    }
    // if (first_card_clicked == this) { //prevents you from 'using' the same card more than once
    //     console.log("you already picked this card as your first card");
    //     return;
    // }

    if (first_card_clicked !== null && second_card_clicked !== null){
        return;
    }
    if(first_card_clicked === null){
        first_card_clicked = this;
        $(first_card_clicked).find(".front").addClass('hidden');
        
    } else { 
        second_card_clicked = this;
        // $('.card').off('click');
        $(second_card_clicked).find(".front").addClass('hidden');
        var firstCardImageURL = $(first_card_clicked).find('.back').css('background-image');
        var secondCardImageURL = $(second_card_clicked).find('.back').css('background-image');
        if(firstCardImageURL === secondCardImageURL){ // if the cards ARE A MATCH
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
        } else { // if the cards are NOT a match
            setTimeout(flipCardsBack, 2000);
            // first_card_clicked = null;
            // second_card_clicked = null;
        }

    }
};

function appendImages(array){
    for(var i = 0; i < array.length; i++){
        var newDiv = $('<div>', {
            class: 'card'
        });
        var divWithFrontClass = $('<div>', {
            class: 'front',
            attr: {
              style: `background-image: url('images/frontcard.jpg')`
            }
        });
        var divWithBackClass = $('<div>', {
            class: 'back' ,
            attr: {
                style: `background-image: url('images/${array[i]}')`
            }
        });
        // var imageElement = $('<img>', {
        //     attr: {
        //         src: `./images/${array[i]}`
        //     }
        // });

        // var frontImageElement = $('<img>' , {
        //     attr: {
        //         src: `./images/${frontCardImage[0]}`
        //     }
        // });

        // divWithBackClass.append(imageElement);
        // divWithFrontClass.append(frontImageElement)
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
    // debugger;
    // << this line makes a copy of the array without affecting the original array
    while(copiedArray.length > 0){
        var randomIndex = Math.floor(Math.random() * copiedArray.length);
        randomArray.push(copiedArray.splice(randomIndex, 1)[0]);
        //splice affects the original array and returns you an item in AN ARRAY!!!
    }
    return randomArray
}
