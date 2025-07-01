// Handle User Input:
// Add event listeners to input fields to capture user input.
// Automatically focus on the next input field after each letter is entered.
// Track Wrong Answers:
// Keep a counter for the number of wrong attempts.
// Display wrong answers and update the counter.
// Reset Game:
// Add event listeners to the reset button to clear inputs, mistakes, and tries.
// Reset the game when the number of tries or mistakes reaches 6.
// Success Alert:
// Show a '🎉 Success' alert when the user correctly guesses the word.

const words = ['colors', 'javascript', 'assuring', 'challenge', 'pathway'];
let currentWord;
//  scramble word  thats randomly generated

function scrambleWord(word) {
  // Scramble and return the scrambled word
  let wordArr = word.split('');
  for (let i = wordArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [wordArr[i], wordArr[j]] = [wordArr[j], wordArr[i]];
  }
  return wordArr.join('');
}

// generate random scrambled word

function generateRandomWord() {
  // Generate and display scrambled word
  const random = Math.floor(Math.random() * words.length);
  currentWord = words[0];

  return currentWord;
}

console.log(generateRandomWord());
// handle user input error

function handleInput() {
  // Handle input change event
  currentWord = generateRandomWord();
  let wrongGuess = '',
    rightGuess = '',
    index = 0;

  const inputGuess = (letter) => {
    if (letter === currentWord[index]) {
      rightGuess += letter;
      index++;
    } else wrongGuess += letter;
  };
  const getWrongGuess = () => {
    console.log(`wrong: ${wrongGuess}`);
  };
  const getRightGuess = () => {
    console.log(`right: ${rightGuess}`);
  };

  return {
    inputGuess,
    getRightGuess,
    getWrongGuess,
  };
}
const inputValue = handleInput();

function getGuess() {
  inputValue.getRightGuess();
  inputValue.getWrongGuess();
}

// for hanle latter key press

const handleLatters = (e) => {
  const alphabet = [];
  for (let i = 97; i <= 122; i++) {
    alphabet.push(String.fromCharCode(i));
  }
  if (alphabet.includes(e.key.toLowerCase())) {
    inputValue.inputGuess(e.key.toLowerCase());
    getGuess();
  }
  return;
};

// Eventlisteners
document.addEventListener('keypress', handleLatters);
