const gameContainer = document.querySelector('.game-container');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status');

// Emojis para as cartas
const emojis = ['🍎', '🍌', '🍇', '🍓', '🍉', '🥭', '🍒', '🍍'];
let cards = [...emojis, ...emojis]; // Duas cópias para pares

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Embaralhar cartas
cards.sort(() => 0.5 - Math.random());

// Criar cartas no jogo
cards.forEach((emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.innerHTML = "❓"; // Face oculta
    card.addEventListener('click', flipCard);
    gameContainer.appendChild(card);
});

// Função para virar carta
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    this.innerHTML = this.dataset.emoji;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

// Verifica se houve um par
function checkForMatch() {
    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedPairs++;

        if (matchedPairs === emojis.length) {
            statusText.innerText = "🎉 Você venceu!";
        }

        resetTurn();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerHTML = "❓";
            secondCard.innerHTML = "❓";
            resetTurn();
        }, 1000);
    }
}

// Reseta a rodada
function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Reinicia o jogo
resetButton.addEventListener('click', () => {
    gameContainer.innerHTML = "";
    matchedPairs = 0;
    statusText.innerText = "";
    
    // Embaralhar novamente
    cards.sort(() => 0.5 - Math.random());

    cards.forEach((emoji) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.innerHTML = "❓";
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
});
