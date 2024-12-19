const morseLettersList = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
}; // liste de l'alphabet morse

const reverseMorseLettersList = Object.fromEntries(Object.entries(morseLettersList).map(([key, value]) => [value, key]));

function textToMorse() { // fontion pout convertir de text en code morse
    const textInput = document.getElementById('textInput').value.toUpperCase(); // prend l'entrée de 'utilisateur
    const morseOutput = textInput.split('').map(char => morseLettersList[char] || '').join(' '); // isole les lettres, convertie les lettres en code morse, re-join les lettres
    document.getElementById('morseOutput').innerText = morseOutput; // montre les resultats
}

function morseToText() { // fontion pout convertir de code morse en text
    const morseInput = document.getElementById('morseInput').value.trim(); // prend l'entrée de 'utilisateur
    const morseWords = morseInput.split(' / '); // isole les mots morse
    const decodedMessage = morseWords.map(morseWord => { // trouve les bonnes lettres morse 
    return morseWord.split(' ').map(code => reverseMorseLettersList[code] || '').join(''); // isole les lettres, convertie les lettres code morse en text, re-join les lettres
    }).join(' '); // rejoin les mots
    document.getElementById('textOutput').innerText = decodedMessage; // montre les resultats
}
