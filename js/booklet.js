const morseLettersList = {
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

var isPlaying = false;

function playMorseLetterSequence(sequence, index) {
  console.log("index: ", index);
  isPlaying = true;
  var delay = 0.3; // dot
  if (sequence[index] == "-") {
    delay = 0.6; // dash
  } else if (sequence[index] == " ") {
    delay = 1; // space
  }
  showMorseCode.innerText += sequence[index];
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

var showMorseCode = document.getElementById("morse");
function playLetter(letter) {
  showMorseCode.innerText = "";
  console.log("letter: ", letter);
  console.log(morseLettersList[letter]);
  playMorseLetterSequence(morseLettersList[letter], 0);
}

// maybe keep track of all the buttons to disable them while the sound is playing
const letterButtons = [];

var lettersContainer = document.getElementById("letters");
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
  letterButtons.push(letterButton);
  lettersContainer.appendChild(letterButton);
}
