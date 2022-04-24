// ========== Images ==========
const clubCards = ['./PNG-cards-1.3/ace_of_clubs.png', './PNG-cards-1.3/2_of_clubs.png', './PNG-cards-1.3/3_of_clubs.png', './PNG-cards-1.3/4_of_clubs.png', './PNG-cards-1.3/5_of_clubs.png', './PNG-cards-1.3/6_of_clubs.png', './PNG-cards-1.3/7_of_clubs.png', './PNG-cards-1.3/8_of_clubs.png', './PNG-cards-1.3/9_of_clubs.png', './PNG-cards-1.3/10_of_clubs.png', './PNG-cards-1.3/jack_of_clubs2.png', './PNG-cards-1.3/queen_of_clubs2.png', './PNG-cards-1.3/king_of_clubs2.png'];

const heartCards = ['./PNG-cards-1.3/ace_of_hearts.png', './PNG-cards-1.3/2_of_hearts.png', './PNG-cards-1.3/3_of_hearts.png', './PNG-cards-1.3/4_of_hearts.png', './PNG-cards-1.3/5_of_hearts.png', './PNG-cards-1.3/6_of_hearts.png', './PNG-cards-1.3/7_of_hearts.png', './PNG-cards-1.3/8_of_hearts.png', './PNG-cards-1.3/9_of_hearts.png', './PNG-cards-1.3/10_of_hearts.png', './PNG-cards-1.3/jack_of_hearts2.png', './PNG-cards-1.3/queen_of_hearts2.png', './PNG-cards-1.3/king_of_hearts2.png'];

const spadeCards = ['./PNG-cards-1.3/ace_of_spades.png', './PNG-cards-1.3/2_of_spades.png', './PNG-cards-1.3/3_of_spades.png', './PNG-cards-1.3/4_of_spades.png', './PNG-cards-1.3/5_of_spades.png', './PNG-cards-1.3/6_of_spades.png', './PNG-cards-1.3/7_of_spades.png', './PNG-cards-1.3/8_of_spades.png', './PNG-cards-1.3/9_of_spades.png', './PNG-cards-1.3/10_of_spades.png', './PNG-cards-1.3/jack_of_spades2.png', './PNG-cards-1.3/queen_of_spades2.png', './PNG-cards-1.3/king_of_spades2.png'];

const diamondCards = ['./PNG-cards-1.3/ace_of_diamonds.png', './PNG-cards-1.3/2_of_diamonds.png', './PNG-cards-1.3/3_of_diamonds.png', './PNG-cards-1.3/4_of_diamonds.png', './PNG-cards-1.3/5_of_diamonds.png', './PNG-cards-1.3/6_of_diamonds.png', './PNG-cards-1.3/7_of_diamonds.png', './PNG-cards-1.3/8_of_diamonds.png', './PNG-cards-1.3/9_of_diamonds.png', './PNG-cards-1.3/10_of_diamonds.png', './PNG-cards-1.3/jack_of_diamonds2.png', './PNG-cards-1.3/queen_of_diamonds2.png', './PNG-cards-1.3/king_of_diamonds2.png'];

// ========== Global Variables ==========

let deck;
let totalScores = 100;
let currentHandScores = 0;
let playerHand = [{ imageSource: './PNG-cards-1.3/card back red.png' }, { imageSource: './PNG-cards-1.3/card back red.png' }, { imageSource: './PNG-cards-1.3/card back red.png' }, { imageSource: './PNG-cards-1.3/card back red.png' }, { imageSource: './PNG-cards-1.3/card back red.png' }];
let selectedCard = [];
let numberOfCoinsSelected = 1;
let coordinateForScoring = 0;

// ========== Phases ==========
const BETTING = 'Betting phase, before player clicks on deal';
const DEALING = 'When player clicks on deal';
const DRAWING = 'When player re-draw/swap his card/s';
let phase = BETTING;

// ========== Counter and switches ==========
let maxSuitCounter = 0;
let straightCardCounter = 0;
let sameRankCounter = 0;
let firstPair = false;
let secondPair = false;
let threeOfAKindCounter = 0;
let fourOfAKindCounter = 0;
let highestRank = 0;
let gameInfo = 'Select your bet';

// ============== Deck Functions ==============

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = Math.floor(Math.random() * cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

// Making a deck of cards
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['♥️', '♦️', '♣️', '♠️'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    let displayColour = 'black';
    if (currentSuit === '♦️' || currentSuit === '♥️') {
      displayColour = 'red';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let cardDisplayName = `${rankCounter}`;
      let pokerRank = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        cardDisplayName = 'A';
        pokerRank = 14;
      } else if (cardName === '11') {
        cardName = 'jack';
        cardDisplayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        cardDisplayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        cardDisplayName = 'K';
      }
      let cardImageSource;

      if (currentSuit === '♥️') {
        cardImageSource = heartCards[rankCounter - 1];
      } else if (currentSuit === '♦️') {
        cardImageSource = diamondCards[rankCounter - 1];
      } else if (currentSuit === '♣️') {
        cardImageSource = clubCards[rankCounter - 1];
      } else if (currentSuit === '♠️') {
        cardImageSource = spadeCards[rankCounter - 1];
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        displayName: cardDisplayName,
        suit: currentSuit,
        colour: displayColour,
        rank: pokerRank,
        imageSource: cardImageSource,
        cardSelected: false,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// function to deal cards to player
const sortCardsOnHand = (cardsOnHand, field) => {
  cardsOnHand.sort((currentCard, nextCard) => {
    if (currentCard[field] < nextCard[field]) {
      return -1;
    }
    if (currentCard[field] > nextCard[field]) {
      return 1;
    }
  });
  return cardsOnHand;
};

const dealCards = () => {
  if (phase === DEALING) {
    playerHand = [];
  }
  let numberOfCardsDealt = 0;
  if (phase === DEALING) {
    numberOfCardsDealt = 5;
  }
  if (phase === DRAWING) {
    numberOfCardsDealt = selectedCard.length;
  }
  for (let i = 0; i < numberOfCardsDealt; i += 1) {
    const dealtCards = deck.pop();
    playerHand.push(dealtCards);
  }
  return playerHand;
};

const reset = () => {
  selectedCard = [];
  maxSuitCounter = 0;
  straightCardCounter = 0;
  sameRankCounter = 0;
  firstPair = false;
  currentHandScores = 0;
  secondPair = false;
  threeOfAKindCounter = 0;
  fourOfAKindCounter = 0;
  highestRank = 0;
};

// ========== Helper functions ==========

const changingCSSforPointBoard = () => {
  const idArrayForPointBoard = ['coin1', 'coin2', 'coin3', 'coin4', 'coin5'];
  for (let i = 0; i < 5; i += 1) {
    if (numberOfCoinsSelected === i + 1) {
      document.getElementById(idArrayForPointBoard[i]).classList.add('selectedPointBoard');
    }
    else { document.getElementById(idArrayForPointBoard[i]).classList.remove('selectedPointBoard'); }
  }
};

// ========== Event listerner functions ==========

const pointBoardClick = () => {
  document.getElementById('coin1').addEventListener('click', () => {
    if (phase === BETTING) {
      numberOfCoinsSelected = 1;
      changingCSSforPointBoard(); }
  });
  document.getElementById('coin2').addEventListener('click', () => {
    if (phase === BETTING) {
      numberOfCoinsSelected = 2;
      changingCSSforPointBoard(); }
  });
  document.getElementById('coin3').addEventListener('click', () => {
    if (phase === BETTING) {
      numberOfCoinsSelected = 3;
      changingCSSforPointBoard(); }
  });
  document.getElementById('coin4').addEventListener('click', () => {
    if (phase === BETTING) {
      numberOfCoinsSelected = 4;
      changingCSSforPointBoard(); }
  });
  document.getElementById('coin5').addEventListener('click', () => {
    if (phase === BETTING) {
      numberOfCoinsSelected = 5;
      changingCSSforPointBoard(); }
  });
  return numberOfCoinsSelected;
};

const dealButtonClick = () => {
  document.getElementById('clickDealtoContinue').innerHTML = '';
  if (phase === BETTING) { console.log('deal button clicked');
    phase = DEALING;
    coordinateForScoring = numberOfCoinsSelected - 1;
    gameInfo = 'Select Cards to Hold';
    document.getElementById('gameInfoContainer').innerHTML = gameInfo;
    initGame();
  }
};

const cardClick = (column) => {
  console.log('coordinates', column);
  // const arrayForSelectedCards = ['card1Hold', 'card2Hold', 'card3Hold', 'card4Hold', 'card5Hold'];
  if (playerHand[column].cardSelected === false) {
    playerHand[column].cardSelected = true;
    // document.getElementById(arrayForSelectedCards[column]).innerHTML = 'Hold';
  } else {
    playerHand[column].cardSelected = false;
    // document.getElementById(arrayForSelectedCards[column]).innerHTML = '';
  }
};

const drawButtonClick = () => {
  if (phase === DEALING) {
    console.log('draw  button clicked');
    for (let i = 0; i < playerHand.length; i += 1) {
      if (playerHand[i].cardSelected === false) {
        selectedCard.push(i);
      }
    }
    for (let i = 0; i < selectedCard.length; i += 1) {
      const dealtCards = deck.pop();
      console.log(dealtCards);
      console.log(selectedCard[i]);
      playerHand.splice(Number(selectedCard[i]), 1, dealtCards);
      console.log(playerHand);
    }
    phase = DRAWING;
    initGame();
  }
};

const muteButtonClick = () => {
  console.log('mute button clicked');
  const audio = document.getElementById('backgroundMusic');
  if (audio.muted === true) {
    audio.muted = false;
  }
  else if (audio.muted === false) {
    audio.muted = true;
  }
};

// ========== Element related functions ==========
const displayCard = () => {
  const arrayForPlayerHands = ['card1', 'card2', 'card3', 'card4', 'card5'];
  for (let i = 0; i < playerHand.length; i += 1) {
    document.getElementById(arrayForPlayerHands[i]).innerHTML = '';
    const card = document.createElement('img');
    card.src = playerHand[i].imageSource;
    card.className = 'image';
    if (playerHand[i].cardSelected === true) {
      card.classList.add('selectedImage');
    } else if (playerHand[i].cardSelected === false) {
      card.classList.remove('selectedImage'); }
    document.getElementById(arrayForPlayerHands[i]).appendChild(card);
    if (phase === DEALING) {
      card.addEventListener('click', () => { cardClick(i);
        displayCard();
      });
    }
  }
};

document.getElementById('gameInfoContainer').innerHTML = gameInfo;

// ========== Calculate score function ==========

const suitCounter = () => {
  let heartsCounter = 0;
  let diamondsCounter = 0;
  let clubsCounter = 0;
  let spadesCounter = 0;
  for (let i = 0; i < playerHand.length; i += 1) {
    if (playerHand[i].suit === '♥️') {
      heartsCounter += 1; }
    else if (playerHand[i].suit === '♦️') {
      diamondsCounter += 1; }
    else if (playerHand[i].suit === '♣️') {
      clubsCounter += 1; }
    else if (playerHand[i].suit === '♠️') {
      spadesCounter += 1; }
  } maxSuitCounter = Math.max(heartsCounter, diamondsCounter, clubsCounter, spadesCounter);
  return maxSuitCounter;
};

const straightCardCheck = () => {
  for (let i = 0; i < 4; i += 1) {
    if (playerHand[i + 1].rank - playerHand[i].rank === 1) {
      straightCardCounter += 1;
    }
  } return straightCardCounter;
};

const cardRankCheck = () => {
  for (let i = 0; i < 4; i += 1) {
    if (playerHand[i].rank === playerHand[i + 1].rank) {
      sameRankCounter += 1;
      if (firstPair === true) {
        secondPair = true;
      }
      firstPair = true;
    } else if (sameRankCounter === 2) {
      threeOfAKindCounter += 1;
      firstPair = false;
      secondPair = false;
      sameRankCounter = 0;
    } else if (sameRankCounter === 3) {
      fourOfAKindCounter += 1;
      sameRankCounter = 0;
      firstPair = false;
      secondPair = false;
    } else { sameRankCounter = 0; }
  } if (sameRankCounter === 2) {
    threeOfAKindCounter += 1;
    secondPair = false;
    if (playerHand[0].rank !== playerHand[1].rank) {
      firstPair = false;
    }
  }
  if (sameRankCounter === 3) {
    fourOfAKindCounter += 1;
    firstPair = false;
    secondPair = false;
  }

  return {
    threeOfAKindCounter, fourOfAKindCounter, firstPair, secondPair,
  };
};

const highestRankCheck = () => {
  for (let i = 0; i < 5; i += 1) {
    if (highestRank < playerHand[i].rank) {
      highestRank = playerHand[i].rank;
    }
  } return highestRank;
};

const calculateScore = () => {
// currentHandScores
  const royalFlush = [250, 500, 750, 1000, 4000];
  const straightFlush = [50, 100, 150, 200, 250];
  const fourOfAKind = [25, 50, 75, 100, 125];
  const fullHouse = [9, 18, 27, 36, 45];
  const flush = [6, 12, 18, 24, 30];
  const straight = [4, 8, 12, 16, 20];
  const threeOfAKind = [3, 6, 9, 12, 15];
  const twoPair = [2, 4, 6, 8, 10];
  const jacksOrBetter = [1, 2, 3, 4, 5];

  sortCardsOnHand(playerHand, 'rank');

  straightCardCheck();
  suitCounter();
  cardRankCheck();
  highestRankCheck();

  // need to reassign the 0 to the bet number

  // Royal Flush
  if (playerHand[0].rank === 10 && straightCardCounter === 4 && maxSuitCounter === 5) {
    currentHandScores = royalFlush[Number(coordinateForScoring)];
    gameInfo = `Royal Flush. Current Hand's Score: ${currentHandScores}`;
  }
  // Straight Flush
  else if (straightCardCounter === 4 && maxSuitCounter === 5) {
    currentHandScores = straightFlush[Number(coordinateForScoring)];
    gameInfo = `Straight Flush. Current Hand's Score: ${currentHandScores}`;
  }
  // Four of a Kind
  else if (fourOfAKindCounter === 1) {
    currentHandScores = fourOfAKind[Number(coordinateForScoring)];
    gameInfo = `Four of a Kind. Current Hand's Score: ${currentHandScores}`;
  }

  // Fullhouse
  else if (threeOfAKindCounter === 1 && firstPair === true) {
    currentHandScores = fullHouse[Number(coordinateForScoring)];
    gameInfo = `Full House. Current Hand's Score: ${currentHandScores}`;
  }

  // Flush
  else if (maxSuitCounter === 5) {
    currentHandScores = flush[Number(coordinateForScoring)];
    gameInfo = `Flush. Current Hand's Score: ${currentHandScores}`;
  }
  // Straight
  else if (straightCardCounter === 4) {
    currentHandScores = straight[Number(coordinateForScoring)];
    gameInfo = `Straight. Current Hand's Score: ${currentHandScores}`;
  }
  // Three of a Kind
  else if (threeOfAKindCounter === 1) {
    currentHandScores = threeOfAKind[Number(coordinateForScoring)];
    gameInfo = `Three of a Kind. Current Hand's Score: ${currentHandScores}`;
  }
  // Two Pair
  else if (firstPair === true && secondPair === true) {
    currentHandScores = twoPair[Number(coordinateForScoring)];
    gameInfo = `Two Pair. Current Hand's Score: ${currentHandScores}`;
  }
  // Jacks or Better
  else if (highestRank > 10) {
    currentHandScores = jacksOrBetter[Number(coordinateForScoring)];
    gameInfo = `Jacks or Better. Current Hand's Score: ${currentHandScores}`;
  }

  else {
    currentHandScores = -1;
    gameInfo = `Nothing. Current Hand's Score: ${currentHandScores}`;
  }
  document.getElementById('gameInfoContainer').innerHTML = gameInfo;
  document.getElementById('clickDealtoContinue').innerHTML = 'Re-select Bet and Click Deal to Continue';

  return currentHandScores;
};

// ========== Initialisation function ==========
const initGame = () => {
  document.getElementById('dealButton').addEventListener('click', dealButtonClick);
  document.getElementById('drawButton').addEventListener('click', drawButtonClick);
  document.getElementById('mute').addEventListener('click', muteButtonClick);
  if (phase === BETTING) {
    displayCard();
    pointBoardClick();
    document.getElementById('drawButton').disabled = true;
  }
  // Dealing phase
  if (phase === DEALING) {
    deck = [];
    deck = shuffleCards(makeDeck());
    dealCards();
    displayCard();
    document.getElementById('drawButton').disabled = false;
    document.getElementById('dealButton').disabled = true;
    totalScores -= numberOfCoinsSelected;
    document.getElementById('creditContainer').innerHTML = `Credit: ${totalScores}`;
  }
  // Drawing phase
  if (phase === DRAWING) {
    displayCard();
    calculateScore();
    totalScores += currentHandScores;
    document.getElementById('creditContainer').innerHTML = `Credit: ${totalScores}`;
    phase = BETTING;
    document.getElementById('dealButton').disabled = false;
    document.getElementById('drawButton').disabled = true;
    reset();
  }
};

initGame();
