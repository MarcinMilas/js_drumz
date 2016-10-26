document.addEventListener("DOMContentLoaded", function() {

    /**** VARIABLES ****/

    // PADS
    // all pads
    var allPads = document.querySelectorAll(".pad");
    // kick pads
    // (clones needed when sounds overlap)
    var kick = document.querySelectorAll(".kick div.pad");
    var kickSound = new Audio("sounds/kick.wav");
    var kickSoundClone = new Audio("sounds/kick.wav");
    // hitHat pads
    var hitHat = document.querySelectorAll(".hitHat div.pad");
    var hitHatSound = new Audio("sounds/hitHat.wav");
    var hitHatSoundClone = new Audio("sounds/hitHat.wav");
    // snare pads
    var snare = document.querySelectorAll(".snare div.pad");
    var snareSound = new Audio("sounds/snare.wav");
    var snareSoundClone = new Audio("sounds/snare.wav");
    // pads iterator
    var iterator = 0;

    // START/PAUSE
    var start = document.querySelector(".start");
    var pause = document.querySelector(".pause");

    // TEMPO
    var bpm = document.querySelector(".bpmDisplay");
    // start bpm value + it's display
    var bpmDisplay = 100;
    bpm.innerHTML = bpmDisplay + " BPM";
    // increase/decrease tempo buttons
    var plusBpm = document.querySelector(".plusBpm");
    var minusBpm = document.querySelector(".minusBpm");
    // calculate tempo to ms
    var tempo = (30000 / bpmDisplay);
    // old tempo value needed to compare with the new tempo value when it's changed
    var tempoOld = tempo;


    /**** FUNCTIONS ****/

    // MAIN FUNCTION
    var startStopControl; // needed to control start/pause and to prevent from pressing start 2 or more times (iterator speeds up)

    function play() {

        startStopControl = setInterval(function() {
            // comparing tempos to determine if it has been changed
            if (tempo != tempoOld) {
                clearInterval(startStopControl);
                play();
            }
            // COLORING
            // coloring current pad
            kick[iterator].classList.add("currentPad");
            hitHat[iterator].classList.add("currentPad");
            snare[iterator].classList.add("currentPad");
            // removing color from previously played pad (else if - when looping)
            if (iterator > 0) {
                kick[iterator - 1].classList.toggle("currentPad");
                hitHat[iterator - 1].classList.toggle("currentPad");
                snare[iterator - 1].classList.toggle("currentPad");
            } else if (iterator === 0) {
                kick[kick.length - 1].classList.remove("currentPad");
                hitHat[kick.length - 1].classList.remove("currentPad");
                snare[kick.length - 1].classList.remove("currentPad");
            }

            // PLAYING
            // playing selected sounds (clones used  to avoid not playing the sound when they overlap)
            // kick
            if (kick[iterator].className.indexOf("selected") != -1) {
                if (iterator % 2 === 0) {
                    kickSound.play();
                } else {
                    kickSoundClone.play();
                }
            }
            // hit-hat
            if (hitHat[iterator].className.indexOf("selected") != -1) {
                if (iterator % 2 === 0) {
                    hitHatSound.play();
                } else {
                    hitHatSoundClone.play();
                }
            }
            // snare
            if (snare[iterator].className.indexOf("selected") != -1) {
                if (iterator % 2 === 0) {
                    snareSound.play();
                } else {
                    snareSoundClone.play();
                }
            }

            // ITERATING
            iterator++;
            // looping
            if (iterator == kick.length) {
                iterator = 0;
            }

        }, tempo);
    }


    // START BUTTON BORDER GLIMMER
    var startButtonLight; // // needed to prevent from pressing start 2 or more times (glimmering speeds up)
    function limeLight() {
        startButtonLight = setInterval(function() {
            start.classList.toggle("limeBorder");
        }, 500);
        // pause button stops this interval
    }

    // BPM BUTTONS LIME BORDER
    var clicked; // variable to assign clicked element
    function bpmControl() {
        bpm.innerHTML = bpmDisplay + " BPM";
        tempo = (30000 / bpmDisplay);
        clicked.classList.add("limeBorder");
        setTimeout(function() {
            clicked.classList.remove("limeBorder");
        }, 200);
    }


    /**** EVENTS ****/

    // PADS
    // selecting
    for (var i = 0; i < allPads.length; i++) {
        allPads[i].addEventListener("click", function() {
            this.classList.toggle("selected");
        });
    }

    // START/PAUSE
    // start
    start.addEventListener("click", function() {
        if (startStopControl === undefined && startButtonLight === undefined) {
            // play
            play();
            // add glimmering lime border
            limeLight();
            // remove border from pause
            pause.classList.remove("limeBorder");
        }
    });

    // pause
    pause.addEventListener("click", function() {
        // clearing intervals
        clearInterval(startStopControl);
        clearInterval(startButtonLight);
        // setting subsidiary variables to undefined (condition to press start again)
        startStopControl = undefined;
        startButtonLight = undefined;
        // setting round lime border
        pause.classList.toggle("limeBorder");
        start.classList.remove("limeBorder");
    });

    // TEMPO
    // increase
    plusBpm.addEventListener("click", function() {
        // change bpms
        bpmDisplay += 5;
        // get clicked element
        clicked = this;
        // change tempo + border single flash
        bpmControl();
    });

    // decrease
    minusBpm.addEventListener("click", function() {
        bpmDisplay -= 5;
        clicked = this;
        bpmControl();
    });

});
