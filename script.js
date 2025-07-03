const displayWord = document.getElementById('scrambled-word');
const inputCons = document.getElementById('input-cons');
const mistakeWord = document.getElementById('mistakes-word');
const resetBtn = document.getElementById('reset-btn');
const randomBtn = document.getElementById('random-btn');

//
const words = ['colors', 'javascript', 'assuring', 'challenge', 'pathway'];
let currentWord;
let mistakes = 0;
let tries = 0;
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
}

// create input

function createInputFields() {
  // Create number of input fields according to the number of letters
  inputCons.innerHTML = '';
  for (let i = 1; i <= currentWord.length; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.readOnly = true;
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
  inputs.forEach((item) => (item.readOnly = true));

  firstNotFocus.value = '_';
  firstNotFocus.readOnly = false;
  firstNotFocus.focus();
  firstNotFocus.click();

  firstNotFocus.addEventListener('blur', () => firstNotFocus.focus());
}
// handle user input error

function handleInput() {
  // Handle input change event
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

  const reset = () => {
    document.querySelectorAll('input').forEach((item) => (item.value = ''));
    handleFocusInput();
    mistakeWord.textContent = '';
    mistakes = 0;
    wrongGuess = '';
    rightGuess = '';
    index = 0;
  };

  return {
    inputGuess,
    getRightGuess,
    getWrongGuess,
    reset,
  };
}
const inputValue = handleInput();

// for handle latter key press

const handleLetters = (e) => {
  const inputs = document.querySelectorAll('input');
  const alphabet = [];
  for (let i = 97; i <= 122; i++) {
    alphabet.push(String.fromCharCode(i));
  }
  let index = inputValue.getRightGuess();

  if (!alphabet.includes(e.key.toLowerCase())) {
    e.preventDefault();
  } else {
    inputValue.inputGuess(e.key.toLowerCase());
    if (e.key.toLowerCase() === currentWord[index]) {
      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value || inputs[i].value === '_') {
          inputs[i].value = e.key.toLowerCase();
          break;
        }
      }
      handleFocusInput();
    } else {
      inputValue.getWrongGuess();
    }
    resetLogic();
  }
};

function resetLogic() {
  if (mistakes >= 6) {
    tries++;
    if (tries < 5) alert(`Oops 😥! Try again you have ${5 - tries} tries left`);
    inputValue.reset();
    displayTries();
  }
  if (inputValue.getRightGuess() === currentWord.length) {
    alert("🎉 Success ! you're genius 🤩");
    resetGame();
  }
  if (tries === 5) {
    alert(`😥 You lost ! the word is ${currentWord}`);
    resetGame();
  }
}

function resetGame() {
  generateRandomWord();
  createInputFields();
  inputValue.reset();
  tries = 0;
  displayTries();
}

function generateRandom() {
  generateRandomWord();
  createInputFields();
  inputValue.reset();
}

// display tries
function displayTries() {
  document.querySelector('#tries-txt span').textContent = tries;
  const progress = document.querySelectorAll('#guess-progress .progress');

  if (tries === 0) {
    progress.forEach(
      (item) => (item.style.backgroundColor = 'rgb(59, 66, 82)')
    );
  }
  for (i = 0; i < tries; i++) {
    progress[i].style.backgroundColor = 'rgb(123, 41, 208)';
  }
}
//
// Eventlistener
document.addEventListener('keydown', handleLetters);
resetBtn.addEventListener('click', resetGame);
randomBtn.addEventListener('click', generateRandom);
generateRandomWord();
createInputFields();
