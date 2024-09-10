let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let msgContainer = document.querySelector('.msg-container');  // Correct selector
let msg = document.querySelector('#msg');
let heading = document.querySelector('h1');

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Handle clicks on each box
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            // Player O
            box.textContent = 'X';
            turnO = false;
        } else {
            // Player X
            box.textContent = 'O';
            turnO = true;
        }
        box.disabled = true; // Disable box after click
        checkWinner(); // Check for the winner after each move
    });
});

// Show winner message and disable further moves
const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner}`;
    msgContainer.classList.remove("hide");
    heading.classList.add("h1");  // Correctly adding a class (without the dot)
    disableAllBoxes();  // Disable all boxes after a winner is found
};

// Check for the winner based on the winning patterns
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos1Val === pos3Val) {
            console.log(`Winner ${pos1Val} wins!`);
            showWinner(pos1Val);
            return;  // Stop checking once a winner is found
        }
    }
};

// Disable all boxes after the game ends
const disableAllBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Reset the game when clicking the reset button
resetBtn.addEventListener('click', () => {
    boxes.forEach((box) => {
        box.textContent = '';
        box.disabled = false; // Make the boxes clickable again
    });
    turnO = true; // Reset turn to Player O
    msgContainer.classList.add("hide"); // Hide the winner message
    msg.innerText = ''; // Clear the winner message content
    heading.classList.remove("h1"); // Remove any winner-specific class on heading if added
});
