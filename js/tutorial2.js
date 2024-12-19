let isHelpShowing = false;
const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// Morse code mapping for each letter
const morseCodeMap = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
}; // alphabet morse

let currentLetter = "";

function generateLetter() {
  isHelpShowing = false;
  const randomIndex = Math.floor(Math.random() * letters.length);
  currentLetter = letters[randomIndex];
  document.getElementById("letter").innerText = currentLetter;
}

window.onload = function () {
  generateLetter();
};

const resultMorseCode = document.getElementById("morseCode");
var keyIsDown = false;
var startTime;
var endTime;
var timer;
var oscillator;

function initializeAudio() {
  var audioCtx = new AudioContext();
  const gain = audioCtx.createGain();
  gain.connect(audioCtx.destination);
  gain.gain.value = 50;
  oscillator = audioCtx.createOscillator();
  oscillator.connect(gain);
  oscillator.frequency.value = 520;
}

document.onkeydown = function (e) {
  if (e.code == "Space") {
    if (!keyIsDown) {
      // if key is already down, ignore it
      initializeAudio();
      oscillator.start();
      keyIsDown = true;
      startTime = Date.now();
      window.clearTimeout(timer);
    }
  }
};

document.onkeyup = function (e) {
  if (e.code == "Space") {
    oscillator.stop();
    keyIsDown = false;
    endTime = Date.now();
    if (endTime - startTime < 30) {
      alert("Sorry! You are clicking too fast!");
      keyIsDown = false;
      return;
    }
    if (endTime - startTime > 400) {
      alert(`The dash was held to long, try again!`);
      resultMorseCode.innerText = "";
    }
    if (endTime - startTime > 200 && endTime - startTime < 400) {
      resultMorseCode.innerText += "-";
    } else if (endTime - startTime > 30 && endTime - startTime < 180) {
      resultMorseCode.innerText += ".";
    }

    timer = setTimeout(() => {
      resultMorseCode.innerHTML += "&nbsp;";
    }, 800);
  }
  if (e.code == "Enter") {
    const userInput = resultMorseCode.innerText.trim().replace(/\s+/g, " "); // Normalize spaces
    const correctMorse = morseCodeMap[currentLetter];
    if (userInput === correctMorse) {
      alert("Correct! Well done!");
    } else {
      alert(
        `Incorrect! The correct Morse code for ${currentLetter} is ${correctMorse}`
      );
    }
    resultMorseCode.innerText = "";
    generateLetter(); 
  }
};

function helpButton(event) {
  if (!isHelpShowing) {
    isHelpShowing = true; //another funny bug fixed
    event.stopPropagation(); //funny bug
    document.getElementById(
      "letter"
    ).innerText += ` (${morseCodeMap[currentLetter]}) `;
  }
}

document.getElementById("buttonAide").addEventListener("click", helpButton);
