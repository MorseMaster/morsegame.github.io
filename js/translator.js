const morseCodeDict = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
};

const reverseMorseCodeDict = Object.fromEntries(Object.entries(morseCodeDict).map(([key, value]) => [value, key]));

function textToMorse() {
    const textInput = document.getElementById('textInput').value.toUpperCase();
    const morseOutput = textInput.split('').map(char => morseCodeDict[char] || '').join(' ');
    document.getElementById('morseOutput').innerText = morseOutput;
}

function morseToText() {
    const morseInput = document.getElementById('morseInput').value.trim();
    const morseWords = morseInput.split(' / ');
    const decodedMessage = morseWords.map(morseWord => {
        return morseWord.split(' ').map(code => reverseMorseCodeDict[code] || '').join('');
    }).join(' ');
    document.getElementById('textOutput').innerText = decodedMessage;
}
