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
};

let currentLetter = ""; // Store the current letter

function generateLetter() {
  // Generate a random index to select a letter
  const randomIndex = Math.floor(Math.random() * letters.length);
  currentLetter = letters[randomIndex]; // Store the current letter
  // Display the random letter
  document.getElementById("letter").innerText = currentLetter;
}

// Call generateLetter when the page loads
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
    // Reset the Morse code input for the next attempt
    resultMorseCode.innerText = "";
    generateLetter(); // Generate a new letter

  function helpButton() {
    document.getElementById("letter").innerText += ` (${morseCodeMap[currentLetter]}) `
  }
  }
};
