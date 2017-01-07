document.addEventListener("DOMContentLoaded", function() {

    /**** VARIABLES ****/

    // PADS
    // all pads
    var allPads = document.querySelectorAll(".pad");
    // kick pads
    // (clones needed when sounds overlap)
    var kick = document.querySelectorAll(".kick div.pad");
    var kickSound = new Audio("sounds/kick.mp3");
    var kickSoundClone = new Audio("sounds/kick.mp3");
    // hitHat pads
    var hitHat = document.querySelectorAll(".hitHat div.pad");
    var hitHatSound = new Audio("sounds/hitHat.mp3");
    var hitHatSoundClone = new Audio("sounds/hitHat.mp3");
    // snare pads
    var snare = document.querySelectorAll(".snare div.pad");
    var snareSound = new Audio("sounds/snare.mp3");
    var snareSoundClone = new Audio("sounds/snare.mp3");
    // pads iterator
    var iterator = 0;

    // CLEAR PATTERN
    var patternClear = document.querySelectorAll(".txt");

    // MUTE
    var muteKick = document.querySelector(".kick .audible");
    var mutehitHat = document.querySelector(".hitHat .audible");
    var muteSnare = document.querySelector(".snare .audible");

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
            if (kick[iterator].className.indexOf("selected") != -1 && kickSound !== "" && kickSoundClone !== "") {
                if (iterator % 2 === 0) {
                    kickSound.play();
                } else {
                    kickSoundClone.play();
                }
            }
            // hit-hat
            if (hitHat[iterator].className.indexOf("selected") != -1 && hitHatSound !== "" && hitHatSoundClone !== "") {
                if (iterator % 2 === 0) {
                    hitHatSound.play();
                } else {
                    hitHatSoundClone.play();
                }
            }
            // snare
            if (snare[iterator].className.indexOf("selected") != -1 && snareSound !== "" && snareSoundClone !== "") {
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

    // MUTE
    function mute(array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].className.indexOf("selected") >= 0) {
          array[i].classList.toggle("mutedSelected");
        } else if (array[i].className.indexOf("tact") >= 0) {
          array[i].classList.toggle("mutedTact");
        } else {
          array[i].classList.toggle("mutedPad");
        }
      }
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

    // CLEAR PATTERN
    for (var i = 0; i < patternClear.length; i++) {
      patternClear[i].addEventListener("click", function(event) {
        // clear kick
        if (event.target === patternClear[0]) {
          for (var i = 0; i < kick.length; i++) {
            kick[i].classList.remove("selected");
          }
        // clear hitHat
        } else if (event.target === patternClear[1]) {
          for (var i = 0; i < hitHat.length; i++) {
            hitHat[i].classList.remove("selected");
          }
        // clear snare
        } else if (event.target === patternClear[2]) {
          for (var i = 0; i < snare.length; i++) {
            snare[i].classList.remove("selected");
          }
        }
      })
    };

    // MUTE
    // mute kick
    muteKick.addEventListener("click", function() {
      if (kickSound !== "" && kickSoundClone !== "") {
        mute(kick);
        kickSound = "";
        kickSoundClone = "";
      } else  {
        mute(kick);
        kickSound = new Audio("sounds/kick.mp3");
        kickSoundClone = new Audio("sounds/kick.mp3");
      }
    })
    // mute hitHat
    mutehitHat.addEventListener("click", function() {
      if (hitHatSound !== "" && hitHatSoundClone !== "") {
        mute(hitHat);
        hitHatSound = "";
        hitHatSoundClone = "";
      } else  {
        mute(hitHat);
        hitHatSound = new Audio("sounds/hitHat.mp3");
        hitHatSoundClone = new Audio("sounds/hitHat.mp3");
      }
    })
    // mute snare
    muteSnare.addEventListener("click", function() {
      if (snareSound !== "" && snareSoundClone !== "") {
        mute(snare);
        snareSound = "";
        snareSoundClone = "";
      } else  {
        mute(snare);
        snareSound = new Audio("sounds/snare.mp3");
        snareSoundClone = new Audio("sounds/snare.mp3");
      }
    })

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
        // removing border from start
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
