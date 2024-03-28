// for testing
document.addEventListener('DOMContentLoaded', () => {
    // add event listener to submit button
    let submitButton = document.getElementById('submitBtn');
    submitButton.addEventListener('click', generateBoard);
});



// Overall generation function
function generateBoard(){

    // get form values
    let boardSize = parseInt(document.getElementById('boardSize').value);
    let numDice = parseInt(document.getElementById('numDice').value)
    let numRolls = parseInt(document.getElementById('numRolls').value);

    // create board
    createBoard(boardSize);

    // simulate dice rolls
    let spaces = simulateRolls((boardSize - 1) * 4, numDice, numRolls);

    // fill board with dice roll data
    fillBoard(spaces);

    // scroll to board
    document.getElementById('board').scrollIntoView({behavior: 'smooth'});

}



// Function for getting random number between min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to create array of spaces and simulate dice rolls on them
function simulateRolls(numSpaces, numDice, numRolls, diceMin=1, diceMax=6) {
    let spaces = new Array(numSpaces).fill(0); // Create array of spaces with 0s

    let rollFreq = new Array(numDice * (diceMax - diceMin + 1)).fill(0); // Create array to store the frequency of each number roll

    let currentSpace = 0; // Start at space 0

    for (let i = 0; i < numRolls; i++) {
        let rollTotal = 0;
        for(let j = 0; j < numDice; j++) {
            let min = diceMin;
            let max = diceMax;
            rollTotal += getRandomNumber(min, max);
        }

        currentSpace = (currentSpace + rollTotal) % numSpaces; // Calculate the next space
        spaces[currentSpace]++; // Increment the number of rolls on the space
        
        // Add the roll to the frequency array
        rollFreq[rollTotal-1]++;
    }

    console.log("Roll counts:")
    console.log(rollFreq);

    // divide all elements in rollFreq by numRolls to get the percentage of each roll
    rollFreq = rollFreq.map(roll => roll / numRolls * 100);

    console.log("Roll percentages:")
    console.log(rollFreq);

    return spaces;
}

// Function to create the grid board
function createBoard(n) {
    const boardContainer = document.getElementById('board');

    // clear the board first
    boardContainer.innerHTML = '';

    boardContainer.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    boardContainer.style.gridTemplateRows = `repeat(${n}, 1fr)`;

    // Calculate the number of edge spaces
    const totalSpaces = (n - 1) * 4; // Adjusted to correctly calculate edge spaces
    let spaces = [];

    // Create all spaces
    for (let i = 0; i < totalSpaces; i++) {
        const space = document.createElement('div');
        space.classList.add('space');
        // space.textContent = i; // Assign number to space
        space.id = `space-${i}`;
        spaces.push(space);
    }

    let currentSpace = 0;

    // Top row, left to right (excluding the last column to avoid duplication)
    for (let col = 1; col <= n; col++, currentSpace++) {
        boardContainer.appendChild(spaces[currentSpace]).style.gridArea = `1 / ${col}`;
    }

    // Right column, top down (excluding the first row and last row)
    for (let row = 2; row < n; row++, currentSpace++) {
        boardContainer.appendChild(spaces[currentSpace]).style.gridArea = `${row} / ${n}`;
    }

    // Bottom row, right to left (including the last column now)
    for (let col = n; col > 0; col--, currentSpace++) {
        boardContainer.appendChild(spaces[currentSpace]).style.gridArea = `${n} / ${col}`;
    }

    // Left column, bottom up (excluding the first row and the last row)
    for (let row = n - 1; row > 1; row--, currentSpace++) {
        boardContainer.appendChild(spaces[currentSpace]).style.gridArea = `${row} / 1`;
    }
}


// Function to fill the board with the dice roll data
function fillBoard(spaces) {
    let maxRolls = Math.max(...spaces); // Get the maximum number of rolls on a space

    // Loop through each space and fill it with the dice roll data
    spaces.forEach((rolls, index) => {
        let space = document.getElementById(`space-${index}`);
        let percentage = (rolls / maxRolls) * 100; // Calculate the percentage of rolls

        space.style.backgroundColor = `rgba(0, 128, 0, ${percentage / 100})`; // Set the background color based on the percentage
        space.textContent = rolls; // Set the text content to the number of rolls
    });
}