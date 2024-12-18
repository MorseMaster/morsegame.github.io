let allowNextLetter = false;

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

const morseCodeLetters = {
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

let currentLetter = "";
let lives = 3;

function generateLetter() {
  allowNextLetter = false;
  const randomIndex = Math.floor(Math.random() * letters.length);
  currentLetter = letters[randomIndex];
  document.getElementById("letter").innerText = currentLetter;
}

function updateLivesDisplay() {
  document.getElementById("lives").innerText = "Vies: " + lives;
  if (lives <= 0) {
    setTimeout(() => {
      alert("Vous n'avez plus de vies! Retour à la page d'accueil.");
      window.location.href = "../index.html";
    }, 1000);
  }
}

window.onload = function () {
  allowNextLetter = true;
  generateLetter();
  updateLivesDisplay();
};

const resultMorseCode = document.getElementById("morseCode");
const message = document.getElementById("message");
const livesDisplay = document.getElementById("lives");
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
    const userInput = resultMorseCode.innerText.trim().replace(/\s+/g, " ");
    if (userInput !== "") {
      allowNextLetter = true;
      const correctMorse = morseCodeLetters[currentLetter];
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
        lives--;
        updateLivesDisplay();
      }
      resultMorseCode.innerText = "";
    }
  }

  if (e.code == "ArrowRight") {
    if (allowNextLetter) {
      message.innerText = "";
      resultMorseCode.innerText = "";
      generateLetter();
      updateLivesDisplay();
    }
  }
};
