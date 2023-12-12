let secretNumberList = [];
let secretNumber = randomNumber();
let attempts = 1

function textOnScreen(tag, text) {
    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(text, 'UK English Female', {rate:1.1});
}

function welcomeScreen() {
    textOnScreen('h1', 'The Secret Number Challenge');
    textOnScreen('p', 'Guess a number from 1 to 10.');
}

welcomeScreen();

function checkGuess() {
    let guess = document.querySelector('input').value;
    if (guess == secretNumber) {
        let wordAttempts = attempts > 1 ? 'attempts' : 'attempt';
       textOnScreen('h1', 'You got it!');
       let textAttempts = `You guessed the secret number with ${attempts} ${wordAttempts}.`;
       textOnScreen('p', textAttempts);
       document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (guess > secretNumber) {
            textOnScreen ('p', 'The secret number is lower.');
        } else {
            textOnScreen ('p', 'The secret number is higher.');   
        }
        attempts++;
        cleanField();
    }
}

function randomNumber() {
    let chosenNumber = parseInt(Math.random() * 10 +1);
    let chosenNumberListAmount = secretNumberList.length;

    if (chosenNumberListAmount == 10) {
        secretNumberList = [];
    }
    if (secretNumberList.includes(chosenNumber)) {
        return randomNumber()
    } else {
        secretNumberList.push(chosenNumber);
        console.log(secretNumberList);
        return chosenNumber;
    }
}

function cleanField() {
    guess = document.querySelector('input')
    guess.value = '';
}

function newGame() {
    secretNumber = randomNumber()
    cleanField();
    attempts = 1;
    welcomeScreen();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}