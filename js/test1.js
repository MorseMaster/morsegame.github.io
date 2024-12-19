//Même comments que game1.js
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
  const randomIndex = Math.floor(Math.random() * letters.length);
  console.log("randomIndex: ", randomIndex);
  currentLetter = letters[randomIndex];
  currentLetterMorseCode = morseCodeLetters[currentLetter];
  console.log("currentLetterMorseCode: ", currentLetterMorseCode);
  // document.getElementById("morseCodeLetter").innerText = currentLetter;
  playMorseLetterSequence(currentLetterMorseCode.split(""), 0);
}

function updateLivesDisplay() {
  document.getElementById("morseHint").innerText = "";
  document.getElementById("textInput").value = "";
  document.getElementById("lives").innerText = "Vies: " + lives;
  if (lives <= 0) {
    setTimeout(() => {
      alert("Vous n'avez plus de vies! Retour à la page d'accueil.");
      window.location.href = "../index.html";
    }, 1000);
  }
}

window.onload = function () {
  updateLivesDisplay();
};

const resultMorseCode = document.getElementById("letter");
const message = document.getElementById("message");
const livesDisplay = document.getElementById("lives2");
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

function playMorseLetterSequence(sequence, index) {
  isPlaying = true;
  var delay = 0.3; // dot
  if (sequence[index] == "-") {
    delay = 0.6; // dash
  } else if (sequence[index] == " ") {
    delay = 1; // space
  }
  // showMorseCode.innerText += sequence[index];
  // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
  const audioCtx = new AudioContext();
  const gain = audioCtx.createGain();
  gain.connect(audioCtx.destination);
  gain.gain.value = 50;
  const oscillator = audioCtx.createOscillator();
  oscillator.connect(gain);
  oscillator.frequency.value = 520;
  oscillator.addEventListener("ended", () => {
    if (sequence.length - 1 != index) {
      playMorseLetterSequence(sequence, index + 1);
    } else {
      isPlaying = false;
    }
  });

  oscillator.start(audioCtx.currentTime + 0.1);
  oscillator.stop(audioCtx.currentTime + 0.1 + delay);
}

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
        lives2--;
        updateLivesDisplay();
      }
      resultMorseCode.innerText = "";
    }
  }

  if (e.code == "ArrowRight") {
    generateLetter();
    updateLivesDisplay();
  }
};

function rendre() {
  let userAnswer = document.getElementById("textInput").value.toUpperCase();
  console.log(userAnswer);
  if (userAnswer == currentLetter) {
    alert("Bien joué!");
  } else {
    lives--;
    alert("Oops! La réponse êtait : " + currentLetter);
  }
  updateLivesDisplay();
}

document.getElementById("showMorse").addEventListener("click", () => {
  console.log(currentLetter);
  document.getElementById("morseHint").innerText =
    morseCodeLetters[currentLetter];
});

document.getElementById("buttonAide").addEventListener("click", () => {
  console.log(currentLetter);
  document.getElementById(
    "morseHint"
  ).innerText = `${morseCodeLetters[currentLetter]} (${currentLetter})`;
});
