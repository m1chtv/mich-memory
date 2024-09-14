const gameBoard = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const cardPairs = [...cardValues, ...cardValues];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCards() {
  shuffle(cardPairs);
  gameBoard.innerHTML = '';
  cardPairs.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length === 2) return;
  
  const card = this;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  
  card.classList.add('flipped');
  card.textContent = card.dataset.value;
  flippedCards.push(card);
  
  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  
  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    score += 10;
    matchedPairs++;
    if (matchedPairs === cardValues.length) {
      alert(`You won! Your score: ${score}`);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
    }, 1000);
    score -= 2;
  }
  
  scoreDisplay.textContent = score;
  flippedCards = [];
}

createCards();
