// Objects for form fields
const boardSizeField = document.getElementById("boardSize");
const numDiceField = document.getElementById("numDice");
const numRollsField = document.getElementById("numRolls");

const submitButton = document.getElementById("submitBtn");
const form = document.getElementById("inputs");


// defining min and max for input field validation (get these from the html attributes)
// So we only have to change these in the html, and not here
const minBoardSize = boardSizeField.min;
const maxBoardSize = boardSizeField.max;
const minNumDice = numDiceField.min;
const maxNumDice = numDiceField.max;
const minNumRolls = numRollsField.min;
const maxNumRolls = numRollsField.max;


// Input field validation functions

// Function to validate board size input
function validateBoardSize() {
    let boardSize = parseInt(boardSizeField.value);
    let isValid = true; // Assume initially valid

    if (isNaN(boardSize) || boardSize < minBoardSize || boardSize > maxBoardSize) {
        // alert("Board size must be between " + minBoardSize + " and " + maxBoardSize);
        boardSizeField.style.borderColor = "red";
        boardSizeField.style.borderWidth = "2px";
        isValid = false; // Mark as invalid
    } else {
        boardSizeField.style.borderColor = "";
        boardSizeField.style.borderWidth = "";
    }

    return isValid;
}

// Function to validate number of dice
function validateNumDice() {
    let numDice = parseInt(numDiceField.value);
    let isValid = true;

    if(isNaN(numDice) || numDice < minNumDice || numDice > maxNumDice) {
        numDiceField.style.borderColor = "red";
        numDiceField.style.borderWidth = "2px";
        isValid = false;
    } else {
        numDiceField.style.borderColor = "";
        numDiceField.style.borderWidth = "";
    }

    return isValid;
}



// Function to validate number of rolls input
function validateNumRolls() {
    let numRolls = parseInt(numRollsField.value);
    let isValid = true; // Assume initially valid

    if (isNaN(numRolls) || numRolls < minNumRolls || numRolls > maxNumRolls) {
        // alert("Number of rolls must be between " + minNumRolls + " and " + maxNumRolls);
        numRollsField.style.borderColor = "red";
        numRollsField.style.borderWidth = "2px";
        isValid = false; // Mark as invalid
    } else {
        numRollsField.style.borderColor = "";
        numRollsField.style.borderWidth = "";
    }

    return isValid;
}

// Function to modify submit button based on validation
function setSubmitButton(status){
    if (status === "enabled"){
        submitButton.disabled = false;
        submitButton.style.backgroundColor = "";
        submitButton.style.color = "";
        submitButton.style.opacity = "";
        submitButton.style.cursor = "";
    } else {
        submitButton.disabled = true;
        submitButton.style.backgroundColor = "lightgrey";
        submitButton.style.color = "black";
        submitButton.style.opacity = "0.5";
        submitButton.style.cursor = "not-allowed";
    }
}


// Function to validate all input fields, called when any value is changed
function validateForm() {
    if(validateBoardSize() && validateNumDice() && validateNumRolls()){
        setSubmitButton("enabled");
    }
    else{
        setSubmitButton("disabled");
    }
}

// event listener for submit button
document.addEventListener("DOMContentLoaded", function() {
    form.addEventListener("input", validateForm);
}
);