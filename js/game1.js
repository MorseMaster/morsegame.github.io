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
