var uberClientId = "qcKD5guOOuK2xIJv2PYzCdJiNhxYR4sR";
var uberServerToken = "dhZm1hsWb82mbLaIZEKbhC434qDZl_0qcin9KPfd";

var imageStrings = ["uberLogo.png", "drivingImg.png", "walkingLogo.png", "bikeLogo.png", "transitLogo.png"];

var startNum;
var binNum;
var audioCtx = new AudioContext();

var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function convertbinary() {
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.type = 'triangle'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom' 
    oscillator.frequency.value = 0;
    oscillator.start();// value in hertz
    startNum = document.getElementById("startNum").value;
    binNum = ((startNum>>> 0).toString(2));
    alert(binNum);
    var temp = binNum.charAt((binNum.length-1));
    var tempcount = 0;
    for(var i = binNum.length-1; i >= 0; i--){
        if(binNum.charAt(i) == "1"){
            if(tempcount==0){
                oscillator.frequency.value=261.6;
                alert(oscillator.frequency.value);
                setTimeout(function() {
    //alert("ho");
}, 500);
            } else if(tempcount==1){
                oscillator.frequency.value=293.7;
                alert(oscillator.frequency.value);
                setTimeout(function() {
    //alert("ho");
}, 500);
            } else if(tempcount==2){
                oscillator.frequency.value=329.6;
                alert(oscillator.frequency.value);
                setTimeout(function() {
    //alert("ho");
    
}, 500);
            } else if(tempcount==3){
                oscillator.frequency.value=349.2;
                alert(oscillator.frequency.value);
                     
                setTimeout(function() {
    //alert("ho");
   
}, 500);
    
            } else if(tempcount==4){
                oscillator.frequency.value=392;
                alert(oscillator.frequency.value);
                     
                setTimeout(function() {
    //alert("ho");
    
}, 500);
   
            } else if(tempcount==5){
               oscillator.frequency.value=440;
                alert(oscillator.frequency.value);
                setTimeout(function() {
    //alert("ho");
   
}, 500);
  
            } else if(tempcount==6){
                oscillator.frequency.value=493.9;
                alert(oscillator.frequency.value);
                setTimeout(function() {
    //alert("ho");
    
}, 500);
                
            } else if(tempcount==7){
                oscillator.frequency.value=523.3;
                alert(oscillator.frequency.value);
                setTimeout(function() {
    //alert("ho");
    
}, 500);
    
            } else if(tempcount==8){
                oscillator.frequency.value=587.3;
                alert(oscillator.frequency.value);    
                setTimeout(function() {
    //alert("ho");
  
}, 500);
   
            } else if(tempcount==9){
                oscillator.frequency.value=659.3;
                alert(oscillator.frequency.value);    
                setTimeout(function() {
    //alert("ho");
    
}, 500);
    
            }
        }
        tempcount++;
    }
    oscillator.stop(0);
}



/**
* NOTE:
* Some of the features of the  Web Audio API currently only work on Chrome, hence the 'webkit' prefix!
*/

(function() {
    // Create audio (context) container
    var audioCtx = new (AudioContext || webkitAudioContext)();

    // Table of notes with correspending keyboard codes. Frequencies are in hertz.
    // The notes start from middle C
    var notesByKeyCode = {
        65: { noteName: 'c4', frequency: 261.6, keyName: 'a' },
        83: { noteName: 'd4', frequency: 293.7, keyName: 's' },
        68: { noteName: 'e4', frequency: 329.6, keyName: 'd' },
        70: { noteName: 'f4', frequency: 349.2, keyName: 'f' },
        71: { noteName: 'g4', frequency: 392, keyName: 'g' },
        72: { noteName: 'a4', frequency: 440, keyName: 'h' },
        74: { noteName: 'b4', frequency: 493.9, keyName: 'j' },
        75: { noteName: 'c5', frequency: 523.3, keyName: 'k' },
        76: { noteName: 'd5', frequency: 587.3, keyName: 'l' },
        186: { noteName: 'e5', frequency: 659.3, keyName: ';' }
    };

    function Key(keyCode, noteName, keyName, frequency) {
        var keyHTML = document.createElement('div');
        var keySound = new Sound(frequency, 'triangle');
        
        /* Cheap way to map key on touch screens */
        keyHTML.setAttribute('data-key', keyCode);

        /* Style the key */
        keyHTML.className = 'key';
        keyHTML.innerHTML = noteName + '<br><span>' + keyName + '</span>';

        return {
            html: keyHTML,
            sound: keySound
        };
    }

    function Sound(frequency, type) {
        this.osc = audioCtx.createOscillator(); // Create oscillator node
        this.pressed = false; // flag to indicate if sound is playing

        /* Set default configuration for sound */
        if(typeof frequency !== 'undefined') {
            /* Set frequency. If it's not set, the default is used (440Hz) */
            this.osc.frequency.value = frequency;
        }

        /* Set waveform type. Default is actually 'sine' but triangle sounds better :) */
        this.osc.type = type || 'triangle';

        /* Start playing the sound. You won't hear it yet as the oscillator node needs to be
        piped to output (AKA your speakers). */
        this.osc.start(0);
    };

    Sound.prototype.play = function() {
        if(!this.pressed) {
            this.pressed = true;
            this.osc.connect(audioCtx.destination);
        }
    };

    Sound.prototype.stop = function() {
        this.pressed = false;
        this.osc.disconnect();
    };

    function createKeyboard(notes, containerId) {
        var sortedKeys = []; // Placeholder for keys to be sorted
        var waveFormSelector = document.getElementById('soundType');

        for(var keyCode in notes) {
            var note = notes[keyCode];

            /* Generate playable key */
            note.key = new Key(keyCode, note.noteName, note.keyName, note.frequency);

            /* Add new key to array to be sorted */
            sortedKeys.push(notes[keyCode]);
        }

        /* Sort keys by frequency so that they'll be added to the DOM in the correct order */
        sortedKeys = sortedKeys.sort(function(note1, note2) {
            if (note1.frequency < note2.frequency) return -1;
            if (note1.frequency > note2.frequency) return 1;

            return 0;
        });

        // Add those sorted keys to DOM
        for(var i = 0; i < sortedKeys.length; i++) {
            document.getElementById(containerId).appendChild(sortedKeys[i].key.html);
        }

        var playNote = function(event) {
            event.preventDefault();
          
            var keyCode = event.keyCode || event.target.getAttribute('data-key');

            if(typeof notesByKeyCode[keyCode] !== 'undefined') {
                // Pipe sound to output (AKA speakers)
                notesByKeyCode[keyCode].key.sound.play();

                // Highlight key playing
                notesByKeyCode[keyCode].key.html.className = 'key playing';
            }
        };

        var endNote = function(event) {
            var keyCode = event.keyCode || event.target.getAttribute('data-key');

            if(typeof notesByKeyCode[keyCode] !== 'undefined') {
                // Kill connection to output
                notesByKeyCode[keyCode].key.sound.stop();

                // Remove key highlight
                notesByKeyCode[keyCode].key.html.className = 'key';
            }
        };

        var setWaveform = function(event) {
            for(var keyCode in notes) {
                notes[keyCode].key.sound.osc.type = this.value;
            }

            // Unfocus selector so value is not accidentally updated again while playing keys
            this.blur();
        };

        // Check for changes in the waveform selector and update all oscillators with the selected type
        waveFormSelector.addEventListener('change', setWaveform);

        window.addEventListener('keydown', playNote);
        window.addEventListener('keyup', endNote);
        window.addEventListener('touchstart', playNote);
        window.addEventListener('touchend', endNote);
    }

    window.addEventListener('load', function() {
        createKeyboard(notesByKeyCode, 'keyboard');
    });
})();



