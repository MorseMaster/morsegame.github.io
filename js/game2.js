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
}; // les lettres morse

let currentLetter = ""; 
let lives = 3;

function generateLetter() { // fonction pour randomiser les lettres 
  allowNextLetter = false;
  const randomIndex = Math.floor(Math.random() * letters.length);
  currentLetter = letters[randomIndex];
  document.getElementById("letter").innerText = currentLetter; // montre la lettre aléatoir
}

function updateLivesDisplay() { // fonction pour montrer les vies
  document.getElementById("lives").innerText = "Vies: " + lives;
  if (lives <= 0) {
    setTimeout(() => {
      alert("Vous n'avez plus de vies! Retour à la page d'accueil.");
      window.location.href = "../index.html"; // envoie l'utilisateur a l'index si ils ne reste plus de vie
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

function initializeAudio() { // L'audio pur le code morse
  var audioCtx = new AudioContext();
  const gain = audioCtx.createGain();
  gain.connect(audioCtx.destination);
  gain.gain.value = 50;
  oscillator = audioCtx.createOscillator();
  oscillator.connect(gain);
  oscillator.frequency.value = 520;
}

document.onkeydown = function (e) { // Fait jouer l'audio en cliquant le barre d'esspace
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

document.onkeyup = function (e) { // Fair apparetre le code morse en tirets et en point
  if (e.code == "Space") {
    oscillator.stop();
    keyIsDown = false;
    endTime = Date.now();
    if (endTime - startTime < 30) {
      message.innerText = "Désolé! Vous cliquez trop vite!"; // Check si ils clickent trops vite
      keyIsDown = false;
      return;
    }
    if (endTime - startTime > 500) { 
      message.innerText = "Le tiret a été maintenu trop longtemps, réessayez!"; // Check si le tiret est maintenu trop long
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

  if (e.code == "Enter") { // Fait que le boutton Enter corrige l'entrée
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
        lives--; // change les vies si ils ont fait un erreur
        updateLivesDisplay();
      }
      resultMorseCode.innerText = ""; 
    }
  }

  if (e.code == "ArrowRight") { // Vas au prochain si ils click la fleche droite
    if (allowNextLetter) {
      message.innerText = ""; // efface le message
      resultMorseCode.innerText = ""; // efface leur code morse
      generateLetter(); // genere une nouvelle lettre
      updateLivesDisplay(); // Update les vies
    }
  }
};
