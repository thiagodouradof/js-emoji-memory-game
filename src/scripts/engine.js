const emojis = [
  "🐱", "🐱", "🦝", "🦝", "🦊", "🦊", 
  "🐶", "🐶", "🐵", "🐵", "🦁", "🦁", 
  "🐯", "🐯", "🐮", "🐮"
];

let openCards = [];
let timerId;
let timeLeft;
let difficulty;

function startGame() {
  const gameBoard = document.querySelector('.game');
  gameBoard.innerHTML = ''; // Limpa o tabuleiro

  // Definir dificuldade
  difficulty = document.getElementById("difficulty").value;
  if (difficulty === 'easy') {
    timeLeft = 60;
  } else if (difficulty === 'medium') {
    timeLeft = 45;
  } else if (difficulty === 'hard') {
    timeLeft = 30;
  }

  // Atualiza o timer na tela
  document.getElementById("timer").textContent = timeLeft;

  // Embaralha e distribui os emojis
  let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));
  for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    gameBoard.appendChild(box);
  }

  // Inicia o temporizador
  timerId = setInterval(countDown, 1000);
}

function countDown() {
  timeLeft--;
  document.getElementById("timer").textContent = timeLeft;
  
  if (timeLeft <= 0) {
    clearInterval(timerId);
    alert("Fim de jogo! O tempo acabou.");
    document.querySelectorAll('.item').forEach(box => box.onclick = null); // Desabilita cliques
  }
}

function handleClick() {
  if (openCards.length < 2) {
    this.classList.add("boxOpen");
    openCards.push(this);
  }

  if (openCards.length == 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }

  openCards = [];

  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    clearInterval(timerId); // Para o temporizador se o jogador ganhar
    alert("Você venceu!");
  }
}
