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
let lives = 3; // Initialize lives

function generateLetter() {
  const randomIndex = Math.floor(Math.random() * letters.length);
  currentLetter = letters[randomIndex]; // Store the current letter
  document.getElementById("letter").innerText = currentLetter; // Display the random letter
}

function updateLivesDisplay() {
  document.getElementById("lives").innerText = "Vies: " + lives; // Update the lives display
  if (lives <= 0) {
    setTimeout(() => {
      alert("Vous n'avez plus de vies! Retour à la page d'accueil.");
      window.location.href = "../index.html"; // Change this to your actual home page URL
    }, 1000);
  }
}

// Call generateLetter when the page loads
window.onload = function () {
  generateLetter();
  updateLivesDisplay(); // Update lives display on load
};

const resultMorseCode = document.getElementById("morseCode");
const message = document.getElementById("message"); // Assuming you have a message element
const livesDisplay = document.getElementById("lives"); // Assuming you have a lives display element
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
      message.innerText = "Désolé! Vous cliquez trop vite!";
      keyIsDown = false;
      return;
    }
    if (endTime - startTime > 500) {
      message.innerText = "Le tiret a été maintenu trop longtemps, réessayez!";
      resultMorseCode.innerText = "";
    }
    if (endTime - startTime > 250 && endTime - startTime < 500) {
      resultMorseCode.innerText += "-";
    } else if (endTime - startTime > 30 && endTime - startTime < 250) {
      resultMorseCode.innerText += ".";
    }

    timer = setTimeout(() => {
      resultMorseCode.innerHTML += "&nbsp;";
    }, 800);
  }

  if (e.code == "Enter") {
    const userInput = resultMorseCode.innerText.trim().replace(/\s+/g, " "); // Normalize spaces
    if (userInput !== "") {
      const correctMorse = morseCodeMap[currentLetter];
      if (userInput === correctMorse) {
        message.innerText = "Correct! Bravo!";
      } else {
        message.innerText =
          "Incorrect! Vous avez écrit " +
          userInput +
          "\n Le code Morse correct pour " +
          currentLetter +
          " est " +
          correctMorse;
        lives--; // Decrement lives
        updateLivesDisplay(); // Update lives display
      }
      resultMorseCode.innerText = ""; // Clear the input
    }
  }

  if (e.code == "ArrowRight") {
    message.innerText = "";
    resultMorseCode.innerText = "";
    generateLetter();
    updateLivesDisplay(); // Update lives display when generating a new letter
  }
};
