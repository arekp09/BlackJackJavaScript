//Blackjack Game

// Card varibles
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack',
    'Ten', 'Nine', 'Eight', 'Seven', 'Six',
    'Five', 'Four', 'Three', 'Two'];

// DOM varibles
let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');
let textGameResult = document.getElementById('text-game-result')
textGameResult.hidden = true;

// Game varibles
let gameStarted = false;
let gameOver = false;
let playerWon = false;
let dealerCards = [];
let playerCards = [];
let dealerScore = 0;
let playerScore = 0;
let deck = [];

hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();


newGameButton.addEventListener('click', function () {
    textGameResult.hidden = true;
    gameStarted = true;
    gameOver = false;
    playerWon = false;
    deck = createDeck();
    deck = shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];

    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    showStatus();
});

hitButton.addEventListener('click', function() {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
});

stayButton.addEventListener('click', function() {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});

function checkForEndOfGame() {
    updateScore();
    if (gameOver) {
        while (dealerScore < playerScore
            && playerScore <= 21
            && dealerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScore();
        }
    }

    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    }

    else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    }
    else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        }
        else {
            playerWon = false;
        }
    }
}

function createDeck() {
let _deck = [];
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            let card = {
                suit: suits[suitIdx],
                value: values[valueIdx]
            }
            _deck.push(card);
        }
    }
    return _deck;
}

function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

function getCardNumericValue(_card) {
    switch (_card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        score += getCardNumericValue(card);
        if (card.value == 'Ace') {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}

function updateScore() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function showStatus() {
    if (!gameStarted) {
        textArea.innerText = 'Welcome to Blackjack Game!'
        return;
    }

    let dealerCardString = '';
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    }

    let playerCardString = '';
    for (let i = 0; i < playerCards.length; i++) {
        playerCardString += getCardString(playerCards[i]) + '\n';
    }

    updateScore();

    textArea.innerText =
        'Dealer has:\n' +
        dealerCardString +
        '(score: ' + dealerScore + ')\n\n'+

        'Player has:\n' +
        playerCardString +
        '(score: ' + playerScore + ')\n\n';

    if (gameOver) {
        if (playerWon) {
            textGameResult.innerText = "YOU WIN!";
        }
        else if (playerScore == dealerScore) {
            textGameResult.innerText = "TIE!";
        }
        else
        {
            textGameResult.innerText = "YOU LOST!";
        }
        textGameResult.hidden = false;
        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }
}

function getNextCard() {
    return deck.shift();
}

function shuffleDeck(_deck) {
    for (let i = 0; i < _deck.length; i++) {
        let swapIdx = Math.trunc(Math.random() * _deck.length);
        let temp = _deck[i];
        _deck[i] = _deck[swapIdx];
        _deck[swapIdx] = temp;
    }
    return _deck;
}

let title = document.getElementById('title');
title.innerText = "BLACKJACK";




