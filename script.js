let currentGame = null;
let score = 0;
let currentAnswer = null;

const gameScreen = document.getElementById('game-screen');
const scoreElement = document.getElementById('score');
const questionElement = document.getElementById('question');
const optionButtons = document.querySelectorAll('.option-button');

function startGame(gameType) {
    currentGame = gameType;
    score = 0;
    updateScore();
    document.querySelector('.container').classList.add('hidden');
    gameScreen.classList.remove('hidden');
    startNewRound();
}

function goBack() {
    gameScreen.classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
}

function updateScore() {
    scoreElement.textContent = score;
}

function startNewRound() {
    if (currentGame === 'numbers') {
        startNumbersRound();
    } else if (currentGame === 'alphabet') {
        startAlphabetRound();
    }
    // Add other game types here
}

function startNumbersRound() {
    const number = Math.floor(Math.random() * 10) + 1;
    currentAnswer = number;
    questionElement.textContent = `Find the number: ${number}`;
    
    const options = [number];
    while (options.length < 4) {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        if (!options.includes(randomNumber)) {
            options.push(randomNumber);
        }
    }
    
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    
    // Set button texts
    optionButtons.forEach((button, index) => {
        button.textContent = options[index];
    });
}

function startAlphabetRound() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    currentAnswer = letter;
    questionElement.textContent = `Find the letter: ${letter}`;
    
    const options = [letter];
    while (options.length < 4) {
        const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        if (!options.includes(randomLetter)) {
            options.push(randomLetter);
        }
    }
    
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    
    // Set button texts
    optionButtons.forEach((button, index) => {
        button.textContent = options[index];
    });
}

function checkAnswer(index) {
    const selectedButton = optionButtons[index];
    const selectedAnswer = selectedButton.textContent;
    
    if (selectedAnswer === currentAnswer.toString()) {
        score++;
        updateScore();
        selectedButton.classList.add('correct');
        setTimeout(() => {
            selectedButton.classList.remove('correct');
            startNewRound();
        }, 500);
    } else {
        startNewRound();
    }
} 