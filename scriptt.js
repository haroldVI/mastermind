// .../80
// .../4
// ten points for:
// pushing regularly (every 30 minutes)
// clean code (indentation)


// ********** Model **********
// .../7
// QuerySelectors
const solutionContainer = document.querySelector('#solution-container');
const triesContainer = document.querySelector('#tries-container');
const tryInputSection = document.querySelector('#try-input-section');
const dummyTry = document.querySelector('#dummy-try');
const tryInputs = document.querySelectorAll('.try-input');
const trySubmitBtn = document.querySelector('#try-submit-btn');
const messageContainer = document.querySelector('#winner-message-container');
const winnerSubmitBtn = document.querySelector('#winner-submit-btn');
const solutionOptions = document.querySelectorAll('.solution-option');

// Save the code/solution of the game in this variable
// Hint: save your code in an array
let code;

// ********** View **********
// .../1
function hideCode() {
  solutionContainer.classList.add('hidden');
  // hide the code
  // have a look at the html to find out how
}

// .../1
function showCode() {
  solutionContainer.classList.remove('hidden');
  // show the code
  // have a look at the html to find out how
}

// .../4
function drawCode(codeArray) {
  // Why should I empty the container when I populate it with new values directly?

  codeArray.forEach((number, index) => {
    solutionOptions[index].innerHTML = number;
  });

  // Draw the code  array into solution-container
  // Don't forget to empty the container first
}

// .../1
function emptyTriesContainer() {
  // empty the tries container
  triesContainer.innerHTML = '';
}

// .../6
function drawNewTry(tryArray, correctNumberCount, correctPlaceCount) {
  // append a new try to the triesContainer (check the html file)

  const clone = dummyTry.cloneNode(true);

  const children = clone.querySelectorAll('.try-option');
  tryArray.forEach((number, index) => {
    children[index].innerHTML = number;
  });

  clone.classList.remove('dont-show');
  clone.removeAttribute('id');
  clone.querySelector('.correct-place').innerHTML = correctPlaceCount;
  clone.querySelector('.correct-color').innerHTML = correctNumberCount;

  // don't forget the winner class if all numbers are correct
  if (correctPlaceCount === children.length) {
    clone.classList.add('winner');
    showCode();
    showMessage();
  }

  triesContainer.appendChild(clone);
}

// .../3
function emptyTryInputs() {
  // empty the try input fields
  tryInputs.forEach(input => {
    input.value = '';
  });
}

// .../2
function showTryInput() {
  // show tryInputContainer
  // hide messageContainer
  // use dont-show class

  tryInputSection.classList.remove('dont-show');
  messageContainer.classList.add('dont-show');
}

// .../2
function showMessage() {
  // hide tryInputContainer
  // show messageContainer
  // use dont-show class

  tryInputSection.classList.add('dont-show');
  messageContainer.classList.remove('dont-show');
}

// ********** Update **********
// .../3
function randomNumber() {
  return Math.floor(Math.random() * 6) + 1;
  // this function returns a random number between 1 and 6
}

// .../4
function generateNewCode() {
  return Array(4).fill(0,0,4).map(() => randomNumber());
  // this function generates and returns a new code (array of 4 random numbers)
}

// .../4
function validateTryInputs() {
  // validate all four try input field
  // make sure all numbers are between 1 and 6
  // return true or false

  let valid = true;

  tryInputs.forEach((input) => {
    if (!input.checkValidity())
      valid = false;
  });

  return valid;
}

// .../6
function initGame() {
  // Reset game

  hideCode();

  code = generateNewCode();

  drawCode(code);

  showTryInput();

  // Remove all entries
  emptyTriesContainer();
}

// .../4
function generateTryArray() {
  // generate an array with the four values from the input fields
  // make sure they are inserted in the array as an int not a string

  const array = [];
  tryInputs.forEach(element => array.push(Number(element.value)));
  return array;
}

// .../10
function calculateCorrectNumberCount(codeArray, tryArray) {
  // Calculate the amount of correct numbers in the tryArray
  // A correct number does not have to be in the correct spot

  let correctNumberCount = 0;
  let index;
  let correctArray = codeArray;

  tryArray.forEach((number) => {
    if (codeArray.includes(number)){
      // 
      // index = codeArray.indexOf(number)&& correctArray.includes(number)
      // delete correctArray[index]
      correctNumberCount += 1;
    }
  });

  return correctNumberCount;
}

// .../6
function calculateCorrectPlaceCount(codeArray, tryArray) {
  // Calculate the amount of numbers matching the code
  // The numbers have to be identical and in the same place

  let correctPlaceCount = 0;

  codeArray.forEach((number, index) => {
    if (number === tryArray[index])
      correctPlaceCount += 1;
  });

  return correctPlaceCount;
}

// ********** Events **********
window.addEventListener('load', function () {
  initGame();
});

// .../8
// on submit btn click
// check if the input are valid
// if the inputs are not valid do nothing
// if they are:
// generate the try array
// calculate the correct number count
// calculate the correct place count
// draw the try in html
// if the try is a winner show the winner btn
// and show the code
// of course you will need to use the correct update/view functions

trySubmitBtn.addEventListener('click', () => {
  if (validateTryInputs()) {
    const tryArray = generateTryArray();
    const correctNumberCount = calculateCorrectNumberCount(code, tryArray);
    const correctPlaceCount = calculateCorrectPlaceCount(code, tryArray);
    drawNewTry(tryArray, correctNumberCount, correctPlaceCount);

    emptyTryInputs();
  }
});

// .../3
// on winner btn click
// init a new game
winnerSubmitBtn.addEventListener('click', initGame);