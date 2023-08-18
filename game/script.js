const gameContainer = document.getElementById('game-container');
const targetNumberElement = document.getElementById('target-number');
const incorrectClicksElement = document.getElementById('incorrect-clicks'); // Add this line
const totalNumbers = 49;
const gridSize = 7;
const boxSize = 100; // Size of each box in pixels
const symbols = ['fa-network-wired', 'fa-bars', 'fa-microchip','fa-bezier-curve','fa-shekel-sign','fa-network-wired fa-rotate-180']; 
const numbers = generateRandomNumbers(totalNumbers);
let targetSymbol = '';
let targetBoxesCount = 0;
let clickedBoxesCount = 0;
let incorrectClicks = 0; // Counter for incorrect clicks

let clearBoxesInterval = null; // Store the interval ID
let addBoxesInterval = null; // Store the interval ID

for (let i = 0; i < totalNumbers; i++) {
  const numberBox = document.createElement('div');
  numberBox.className = 'number-box';
  const symbolIndex = numbers[i] % symbols.length;
  numberBox.innerHTML = `<i class="fa ${symbols[symbolIndex]}"></i>`; // Use Font Awesome icons
  numberBox.setAttribute('data-symbol', symbols[symbolIndex]);
  gameContainer.appendChild(numberBox);

  numberBox.addEventListener('click', () => {
    const clickedSymbol = numberBox.getAttribute('data-symbol');
    if (clickedSymbol === targetSymbol) {
      if (numberBox.style.backgroundColor !== 'lightgreen') {
        numberBox.style.backgroundColor = 'lightgreen';
        clickedBoxesCount++;

        if (clickedBoxesCount === targetBoxesCount) {
          setTimeout(() => {
            alert(`Congratulations! You clicked all ${targetSymbol}s.`);
            resetGame();
          }, 200);
        }
      }
    } else {
      // Increase the incorrect clicks count
      incorrectClicks++;
      incorrectClicksElement.textContent = `Incorrect Clicks: ${incorrectClicks}`; // Update the incorrect clicks element
    }
  });
}

function generateRandomNumbers(totalNumbers) {
  const numbers = [];
  for (let i = 0; i < totalNumbers; i++) {
    numbers.push(Math.floor(Math.random() * 100)); // Generate random numbers for symbol selection
  }
  return numbers;
}

function countTargetBoxes(symbol) {
  let count = 0;
  document.querySelectorAll('.number-box').forEach(box => {
    if (box.getAttribute('data-symbol') === symbol) {
      count++;
    }
  });
  return count;
}

function resetGame() {
  document.querySelectorAll('.number-box').forEach(box => {
    box.style.backgroundColor = '#03303b';
    box.style.opacity = 1; // Reset opacity
  });

  startNewGame();
}

function startNewGame() {
  let validTargetSymbols = symbols.filter(symbol => countTargetBoxes(symbol) > 5);

  if (validTargetSymbols.length === 0) {
    resetGame();
    return;
  }

  // Exclude the previous target symbol from the valid options
  const filteredSymbols = validTargetSymbols.filter(symbol => symbol !== targetSymbol);
  targetSymbol = filteredSymbols[Math.floor(Math.random() * filteredSymbols.length)];
  targetNumberElement.innerHTML = `<i class="fa ${targetSymbol}"></i>`;

  targetBoxesCount = countTargetBoxes(targetSymbol);
  clickedBoxesCount = 0;
}

function clearBoxesRandomly() {
  const boxes = document.querySelectorAll('.number-box');
  boxes.forEach(box => {
    if (Math.random() < 0.5 && box.style.backgroundColor !== 'lightgreen') {
      box.style.opacity = 0.02; // Make the box disappear
    }
  });
}

function addBoxesBack() {
  const boxes = document.querySelectorAll('.number-box');
  boxes.forEach(box => {
    box.style.opacity = 1; // Make the box reappear
  });
}

startNewGame();
clearBoxesInterval = setInterval(clearBoxesRandomly, 500); // Clear boxes randomly every second
addBoxesInterval = setInterval(addBoxesBack, 1000); // Add boxes back every 2 seconds
