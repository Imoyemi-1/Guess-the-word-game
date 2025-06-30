// Generate Random Scrambled Word:
// Create an array of words.
// Write a function to randomly select a word and scramble it.
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

function scrambleWord(word) {
  // Scramble and return the scrambled word
  let wordArr = word.split('');
  for (let i = wordArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [wordArr[i], wordArr[j]] = [wordArr[j], wordArr[i]];
  }
  return wordArr.join('');
}
