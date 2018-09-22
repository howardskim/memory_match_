$(document).ready(initialize)
var game;
function initialize(){
game = new MemoryMatch();
game.doThisWhenReady()
}

class MemoryMatch {
    constructor() {
        this.imageArray = [{
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
        ];
        this.first_card_clicked = null;
        this.second_card_clicked = null;
        this.total_possible_matches = 9;
        this.match_counter = 0;
        this.matches = 0;
        this.attempts = 0;
        this.accuracy = 0;
        this.times_played = 0;
        this.canIClick = true;
    }

    doThisWhenReady() {

        var arrayWithDoublePictures = this.doubleImage(this.imageArray);
        var randomArray = this.randomizer(arrayWithDoublePictures)
        this.appendImages(randomArray);
        this.applyEventHandlers();

    }

     applyEventHandlers() {
        $('.card').on('click', this.whenACardIsClicked.bind(this))
        $('.modalResetButton').on('click', this.resetGame.bind(this))
        $('.resetButton').on('click', this.resetGame.bind(this));
        this.startStats();
        $(this).on('click', function (event) {
            if (event.target === myModal) {
                $(myModal).css('display', 'none');
            }
        })
    }

    startStats() {
        this.times_played++;
        this.attempts = 0;
        var gamesPlayedDiv = $('.timesPlayed p');
        gamesPlayedDiv.text(`# of games played: ${this.times_played}`);
        var numberOfTriesDiv = $('.numberOfTries p');
        numberOfTriesDiv.text(`number of tries: ${this.attempts}`);
        var accuracyDiv = $('.accuracy');
        accuracyDiv.text('Accuracy' + ' 0 %');


    }


    display_stats() {
        var gamesPlayedDiv = $('.timesPlayed p');
        gamesPlayedDiv.text(`# of games played: ${this.times_played}`);
        var numberOfTriesDiv = $('.numberOfTries p');
        numberOfTriesDiv.text(`number of tries: ${this.attempts}`);
        var accuracyDiv = $('.accuracy');
        var accuracyPercentage = Math.round((this.matches / this.attempts) * 100);
        accuracyDiv.text('Accurary: ' + accuracyPercentage + ' %')
        
    };


    resetGame() {
        this.canIClick = true;
        this.startStats();
        $('.cardArea').empty();
        var arrayWithDoublePictures = this.doubleImage(this.imageArray);
        var randomArray = this.randomizer(arrayWithDoublePictures)
        this.appendImages(randomArray);
        this.total_possible_matches = 9;
        this.first_card_clicked = null;
        this.second_card_clicked = null;
        this.accuracy = 0;
        this.matches = 0;
        this.attempts = 0;
        this.match_counter = 0;
        $('.timesPlayed').text(`# of games played: ${this.times_played}`);
        $('.card').on('click', this.whenACardIsClicked.bind(this))
        $('.card div').removeClass('showCharactersFace');
        var characterImageArea = $('.characterArea');
        characterImageArea.attr('src', '');
        $('#logoArea').attr('src', 'images/logo3.png')
        var modal = $('.modal');
        modal.css('display', 'none');
    }

    flipCardsBack() {
        // debugger;
        $(this.first_card_clicked).find(".back").removeClass('showCharactersFace');
        $(this.second_card_clicked).find(".back").removeClass('showCharactersFace');
        this.first_card_clicked = null;
        this.second_card_clicked = null;
        this.canIClick = true;
    };

    playSound(mp3) {
        var audio = new Audio(`./sounds/${mp3}`);
        audio.play();
    }

    win() {
        var accuracyPercentage = Math.round((matches / attempts) * 100);
        var modal = $('.modal');
        modal.css('display', 'block');
        var modalContent = $('.modal-content');
        modalContent.addClass('winBackground');
        $('.modal-content h1').text(`Congratulations! Your accuracy was around ${accuracyPercentage}%`);

    }

    whenACardIsClicked() {
        var characterImageArea = $('.characterArea');
        var logoArea = $('#logoArea');
        
        if ($(event.currentTarget).find('.back').hasClass('showCharactersFace')) {
            return;
        }
        if (this.canIClick === false) {
            return;
        }
        if (this.first_card_clicked === null) {
            // this.first_card_clicked = this;
            this.first_card_clicked = $(event.currentTarget)
            $(this.first_card_clicked).find(".back").addClass('showCharactersFace');
            return;
        } else {
            // debugger;
            this.second_card_clicked = $(event.currentTarget); // changed from this
            $(this.second_card_clicked).find(".back").addClass('showCharactersFace');
            this.canIClick = false;
            var firstCardImageURL = $(this.first_card_clicked).find('.front').attr('src');
            var secondCardImageURL = $(this.second_card_clicked).find('.front').attr('src');
            // if the cards ARE A MATCH
            if (firstCardImageURL === secondCardImageURL) {
                logoArea.attr('src', $(this.first_card_clicked).find('.front').attr('winGif')); // after the src, this is the SECOND parameter
                // var characterSound = $(this).attr('sound');
                var characterSound = $(event.currentTarget).attr('sound');
                this.playSound(characterSound);
                this.attempts++;
                this.matches++;
                this.match_counter++;
                this.display_stats();
                if (this.matches === this.total_possible_matches) {
                    setTimeout(win, 500)

                }
                this.first_card_clicked = null;
                this.second_card_clicked = null;
                this.canIClick = true;
            } else { // if the cards are NOT a match
                setTimeout(this.flipCardsBack.bind(this), 2000);
                this.attempts++;
                this.display_stats();
            }
        }
    };

    appendImages(array) {
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

    doubleImage(array) {
        var arrayWithDoublePictures = [];
        for (var i = 0; i < array.length; i++) {
            arrayWithDoublePictures.push(array[i], array[i])
        }
        return arrayWithDoublePictures;
    }

    randomizer(array) {
        var randomArray = [];
        while (array.length > 0) {
            var randomIndex = Math.floor(Math.random() * array.length);
            randomArray.push(array.splice(randomIndex, 1)[0]);
        }
        return randomArray
    }
}

// var game = new MemoryMatch();
// $(document).ready(game)