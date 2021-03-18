document.getElementById('result').style.display="none"


let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack',
    'Ten', 'Nine', 'Eight', 'Seven', 'Six',
    'Five', 'Four', 'Three', 'Two'
];
// Creating a serial deck

function createDeck() {
    let deck = []
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            let card = {
                suit: suits[suitIdx],
                value: values[valueIdx]
            }
            deck.push(card);
        }
    }
    return deck;
}
var uniformDeck = createDeck();
//console.log(createDeck());

// Shuffle the created deck
function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    }
    return deck
}
let playingDeck = shuffleDeck(uniformDeck);
//console.log(playingDeck);

// converting the string into a numeric value
function getCardNumericValue(card) {
    switch (card.value) {
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


let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;
document.getElementById("stay").style.display = "none"
document.getElementById('hit').style.display = "none"
document.getElementById('reset').style.display = "none"
document.getElementById('display').style.display = "none"

// add player card to the UI
function playerCardAdder(value, suit) {
    var x = document.createElement("IMG");
    x.setAttribute("src", "images/" + value + " of " + suit + ".png");
    x.setAttribute("width", "120");
    x.setAttribute("height", "200");
    x.setAttribute("alt", value + " of " + suit);
    document.getElementById("player-cards").appendChild(x);
}
// add dealers card to the UI
function dealerCardAdder(value, suit, selector = "dealer-cards") {
    var x = document.createElement("IMG");
    x.setAttribute("src", "images/" + value + " of " + suit + ".png");
    x.setAttribute("width", "120");
    x.setAttribute("height", "200");
    x.setAttribute("alt", value + " of " + suit);
    document.getElementById(selector).appendChild(x);
}
//Giving Player and Dealer their initial Cards and score
function assignCards() {
    playerCards.push(playingDeck[0]);
    playerScore += getCardNumericValue(playingDeck[0]);
    document.getElementById('player-score').innerText = "Player Score: " + playerScore
    playerCardAdder(playingDeck[0].value, playingDeck[0].suit);
    playingDeck.shift(0);

    dealerCards.push(playingDeck[0]);
    dealerScore += getCardNumericValue(playingDeck[0]);
    document.getElementById('dealer-score').innerText = "Dealer Score: " + dealerScore + "+"
    dealerCardAdder(playingDeck[0].value, playingDeck[0].suit);
    playingDeck.shift(0);

    playerCards.push(playingDeck[0]);
    playerScore += getCardNumericValue(playingDeck[0]);
    document.getElementById('player-score').innerText = "Player Score: " + playerScore
    playerCardAdder(playingDeck[0].value, playingDeck[0].suit);
    playingDeck.shift(0);

    dealerCards.push(playingDeck[0]);
    dealerScore += getCardNumericValue(playingDeck[0]);
    dealerCardAdder(playingDeck[0].value, playingDeck[0].suit);
    playingDeck.shift(0);

    return playingDeck;
}

// New game button function
function newGame() {
    document.getElementById('display').style.display = "flex"
    document.getElementById('new-game').style.display = "none"
    document.getElementById('hit').style.display = "inline"
    document.getElementById('stay').style.display = "inline"
    console.log(assignCards());
    console.log(playerCards);
    console.log(dealerCards);
    console.log("Player Score: " + playerScore);
    console.log("Dealer Score: " + dealerScore);
    dealerCardAdder("Back", "Yellow", "hidden");
}

// hit button function
function hit() {

    playerCards.push(playingDeck[0]);
    playerScore += getCardNumericValue(playingDeck[0])
    document.getElementById('player-score').innerText = "Player Score: " + playerScore
    playerCardAdder(playingDeck[0].value, playingDeck[0].suit);
    playingDeck.shift(0);
    console.log("Player Score: " + playerScore);
    checkStatus();
}


// Stay button function
function stay() {
    document.getElementById('hidden').style.visibility = "hidden";

    if (dealerScore < playerScore) {

        while (dealerScore < playerScore) {
            dealerCards.push(playingDeck[0]);
            dealerScore += getCardNumericValue(playingDeck[0]);
            document.getElementById('dealer-score').innerText = "Dealer Score: " + dealerScore
            dealerCardAdder(playingDeck[0].value, playingDeck[0].suit);
            playingDeck.shift(0);

            console.log("Dealer SCore: " + dealerScore);

            checkWin();
        };


    } else {
        checkWin();
    }


}

function checkStatus() {
    if (playerScore > 21) {
        hideAction();
        var result = "Dealer has won"
        document.getElementById('result').innerText = result
        winnerIs();
        return console.log("Dealer has won the Game")
    }


}

function checkWin() {
    if ((dealerScore <= 21) && (dealerScore >= playerScore)) {
        hideAction();
        var result = "Dealer has won"
        document.getElementById('result').innerText = result
        winnerIs();
        console.log(result);

    }
    if (dealerScore < playerScore) {
        console.log("Continue Dealing");
        document.getElementById('dealer-score').innerText = "Dealer Score: " + dealerScore
    } 
    else if ((dealerScore > 21) && (dealerScore > playerScore)) {
        hideAction();
        var result = "You have won"
        document.getElementById('result').innerText = result
        winnerIs();
        console.log("Player has won the game");
    }

}

function reset() {
    return location.reload();
}

function hideAction() {
    document.getElementById('hidden').style.visibility = "hidden";
    document.getElementById("stay").style.display = "none"
    document.getElementById('hit').style.display = "none"
    document.getElementById('reset').style.display = "inline"
    document.getElementById('dealer-score').innerText = "Dealer Score: " + dealerScore
}

function winnerIs(){
    document.getElementById('result').style.display="inline"
}

