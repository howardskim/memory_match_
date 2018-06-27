$(document).ready(doThisWhenReady);
// var imageArray = ['dva.png', 'genji.png', 'hanzo.png', 'junkrat.png', 'mercy.png', 'pharah.png', 'reaper.png', 'roadhog.png', 'soldier.png'];;;
var imageArray = ['dva.png', 'genji.png']
function doThisWhenReady(){
    var arrayWithDoublePictures = doubleImage(imageArray);
    var randomArray = randomizer(arrayWithDoublePictures)
    appendImages(randomArray);
    eventHandler();
}

function eventHandler(){
    $('.front').on('click', hideCard)
}

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
        // console.log(newDiv)
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
function hideCard(){
    $(this).addClass('hidden');
    console.log('this:', this)
}