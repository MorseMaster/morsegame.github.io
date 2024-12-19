const letters = [ //letters for random letter generator
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

const morseCodeLetters = { //const for morse sound
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

let currentLetter = ""; //crée espace memoire pour garder la lettre courante
let lives = 3;

function generateLetter() { // fonction pour choisir une lettre aleatoire utilisant Math
  const randomIndex = Math.floor(Math.random() * letters.length);
  console.log("randomIndex: ", randomIndex);
  currentLetter = letters[randomIndex];
  currentLetterMorseCode = morseCodeLetters[currentLetter];
  console.log("currentLetterMorseCode: ", currentLetterMorseCode);
  // document.getElementById("morseCodeLetter").innerText = currentLetter;
  playMorseLetterSequence(currentLetterMorseCode.split(""), 0);
}

function updateLivesDisplay() { //Affiche la lettre sur le site
  document.getElementById("morseHint").innerText = "";
  document.getElementById("textInput").value = "";
  document.getElementById("lives").innerText = "Vies: " + lives;
  if (lives <= 0) { //affiche lives
    setTimeout(() => {
      alert("Vous n'avez plus de vies! Retour à la page d'accueil.");
      window.location.href = "../index.html"; 
    }, 1000);
  }
}

window.onload = function () { // calls previous function
  updateLivesDisplay();
};

const resultMorseCode = document.getElementById("letter"); //declaires consts for result, message et lives
const message = document.getElementById("message");
const livesDisplay = document.getElementById("lives2");
var timer; 
var oscillator;

function initializeAudio() { //fonction qui crée le son
  var audioCtx = new AudioContext();
  const gain = audioCtx.createGain();
  gain.connect(audioCtx.destination);
  gain.gain.value = 50;
  oscillator = audioCtx.createOscillator(); //mysterious black magic
  oscillator.connect(gain);
  oscillator.frequency.value = 520;
}

function playMorseLetterSequence(sequence, index) { //fonction qui actually fait le son jouer
  isPlaying = true; //Est-ce que ca joue?
  var delay = 0.3; // dot
  if (sequence[index] == "-") {
    delay = 0.6; // dash
  } else if (sequence[index] == " ") {
    delay = 1; // space
  }
  // Trouvé au : https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
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
      isPlaying = false; // si non, le son ne jou pas
    }
  });

  oscillator.start(audioCtx.currentTime + 0.1);
  oscillator.stop(audioCtx.currentTime + 0.1 + delay);
}

document.onkeyup = function (e) { //Pour le space bar qui arrête le son
  if (e.code == "Space") {
    oscillator.stop();
    keyIsDown = false;
    endTime = Date.now();
    if (endTime - startTime < 30) { //Pour compter the length pour que le dot ne soit pas trop court
      message.innerText = "Désolé! Vous cliquez trop vite!";
      keyIsDown = false;
      return;
    }
    if (endTime - startTime > 500) { //Si le space bar est trop long
      message.innerText = "Le tiret a été maintenu trop longtemps, réessayez!";
      resultMorseCode.innerText = "";
    }
    if (endTime - startTime > 250 && endTime - startTime < 500) { //c'est un dash
      resultMorseCode.innerText += "-";
    } else if (endTime - startTime > 30 && endTime - startTime < 250) { //c'est un dot
      resultMorseCode.innerText += ".";
    }

    timer = setTimeout(() => {
      resultMorseCode.innerHTML += "&nbsp;";
    }, 800);
  }

function rendre() { // pour le bouton rendre
  let userAnswer = document.getElementById("textInput").value.toUpperCase();
  console.log(userAnswer);
  if (userAnswer == currentLetter) {  //si c'est bon
    alert("Bien joué!");
  } else {  //si il y as une érreur dans la réponse de l'utilisateur
    lives--; // enleve une vie
    alert("Oops! La réponse êtait : " + currentLetter);
  }
  updateLivesDisplay();
}

document.getElementById("showMorse").addEventListener("click", () => { 
  console.log(currentLetter);
  document.getElementById("morseHint").innerText =
    morseCodeLetters[currentLetter];
});

document.getElementById("buttonAide").addEventListener("click", () => { //affiche code morse 
  console.log(currentLetter);
  document.getElementById(
    "morseHint"
  ).innerText = `${morseCodeLetters[currentLetter]} (${currentLetter})`;
});
