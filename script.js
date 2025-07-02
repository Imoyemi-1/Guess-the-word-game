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

const displayWord = document.getElementById('scrambled-word');
const inputCons = document.getElementById('input-cons');
const mistakeWord = document.getElementById('mistakes-word');

//
const words = ['colors', 'javascript', 'assuring', 'challenge', 'pathway'];
let currentWord;
let mistakes = 0;
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
  currentWord = words[random];

  displayWord.textContent = scrambleWord(currentWord);
  return currentWord;
}

// create input

function createInputFields() {
  // Create number of input fields according to the number of letters
  currentWord = generateRandomWord();
  for (let i = 1; i <= currentWord.length; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.readOnly = true;
    // input.tabIndex = '-1';
    inputCons.appendChild(input);
  }
  handleFocusInput();
}

function handleFocusInput() {
  const inputs = document.querySelectorAll('input');

  for (let i = 0; i <= inputs.length; i++) {
    if (!inputs[i]) return;
    if (!inputs[i].value && inputs[i].value !== '_') {
      firstNotFocus = inputs[i];
      break;
    }
  }

  firstNotFocus.value = '_';
  firstNotFocus.focus();
  firstNotFocus.addEventListener('blur', () => firstNotFocus.focus());
}
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
    } else {
      wrongGuess += letter;
      mistakes++;
    }
  };

  const getWrongGuess = () => {
    const mistake = wrongGuess
      .split('')
      .map((word) => word)
      .join(',');

    mistakeWord.textContent = mistake;
  };
  const getRightGuess = () => {
    return rightGuess.length;
  };

  return {
    inputGuess,
    getRightGuess,
    getWrongGuess,
  };
}
const inputValue = handleInput();

// for hanle latter key press

const handleLatters = (e) => {
  const inputs = document.querySelectorAll('input');
  const alphabet = [];
  for (let i = 97; i <= 122; i++) {
    alphabet.push(String.fromCharCode(i));
  }
  let index = inputValue.getRightGuess();

  if (alphabet.includes(e.key.toLowerCase())) {
    inputValue.inputGuess(e.key.toLowerCase());
    if (e.key === currentWord[index]) {
      console.log(e.key, currentWord[index], index);
      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value || inputs[i].value === '_') {
          inputs[i].value = e.key;
          break;
        }
      }
      handleFocusInput();
    } else {
      inputValue.getWrongGuess();
    }
    resetGame();
  }
  return;
};

function resetGame() {
  if (mistakes >= 6) {
    console.log('game over');
  } else if (inputValue.getRightGuess() === currentWord.length) {
    console.log('You won');
  }
}
//
// Eventlisteners
document.addEventListener('keypress', handleLatters);
generateRandomWord();
createInputFields();
