const morseLettersList = { //pour que l'ordi connait le code morse de toutes les lettres.
  a: [".", "-"],
  b: ["-", ".", ".", "."],
  c: ["-", ".", "-", "."],
  d: ["-", ".", "."],
  e: ["."],
  f: [".", ".", "-", "."],
  g: ["-", "-", "."],
  h: [".", ".", ".", "."],
  i: [".", "."],
  j: [".", "-", "-", "-"],
  k: ["-", ".", "-"],
  l: [".", "-", ".", "."],
  m: ["-", "-"],
  n: ["-", "."],
  o: ["-", "-", "-"],
  p: [".", "-", "-", "."],
  q: ["-", "-", ".", "-"],
  r: [".", "-", "."],
  s: [".", ".", "."],
  t: ["-"],
  u: [".", ".", "-"],
  v: [".", ".", ".", "-"],
  w: [".", "-", "-"],
  x: ["-", ".", ".", "-"],
  y: ["-", ".", "-", "-"],
  z: ["-", "-", ".", "."],
  1: [".", "-", "-", "-", "-"],
  2: [".", ".", "-", "-", "-"],
  3: [".", ".", ".", "-", "-"],
  4: [".", ".", ".", ".", "-"],
  5: [".", ".", ".", ".", "."],
  6: ["-", ".", ".", ".", "."],
  7: ["-", "-", ".", ".", "."],
  8: ["-", "-", "-", ".", "."],
  9: ["-", "-", "-", "-", "."],
  0: ["-", "-", "-", "-", "-"],
};

var isPlaying = false; //La page commence sans du bruit

function playMorseLetterSequence(sequence, index) { //Pour joeur le son du dot dash
  console.log("index: ", index);
  isPlaying = true; //Maintenant il y as du bruit
  var delay = 0.3; // dot
  if (sequence[index] == "-") {
    delay = 0.6; // dash
  } else if (sequence[index] == " ") {
    delay = 1; // espace
  }
  showMorseCode.innerText += sequence[index]; //montrer au utilisateur le code morse
  // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
  const audioCtx = new AudioContext();
  const gain = audioCtx.createGain();
  gain.connect(audioCtx.destination);
  gain.gain.value = 50;
  const oscillator = audioCtx.createOscillator();
  oscillator.connect(gain);
  oscillator.frequency.value = 520; //black magic, copied from internet
  oscillator.addEventListener("ended", () => {
    if (sequence.length - 1 != index) { //is the sound over?
      playMorseLetterSequence(sequence, index + 1);
    } else { //yes?
      isPlaying = false; //alors il n'y as plus de som
    }
  });

  oscillator.start(audioCtx.currentTime + 0.1);
  oscillator.stop(audioCtx.currentTime + 0.1 + delay); //attendre avant commencer le prochain
}

var showMorseCode = document.getElementById("morse"); //ici sa montre le code morse
function playLetter(letter) {
  showMorseCode.innerText = "";
  console.log("letter: ", letter); //debugging
  console.log(morseLettersList[letter]);
  playMorseLetterSequence(morseLettersList[letter], 0);
}

const letterButtons = [];

var lettersContainer = document.getElementById("letters"); //ou mettre la lettre
for (const letter in morseLettersList) {
  // create all the buttons
  var letterButton = document.createElement("button");
  letterButton.innerHTML = letter;
  letterButton.onclick = function () {
    if (!isPlaying) {
      playLetter(letter);
      return false;
    }
  };
  letterButtons.push(letterButton); // boutton qui fonctionne
  lettersContainer.appendChild(letterButton);
}
