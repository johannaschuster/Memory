// Konstanten für das Spiel
const cardsArray = [
    {
      name: 'javascript',
      img: 'images/js-logo.png',
    },
    {
      name: 'typescript',
      img: 'images/ts-logo.png',
    },
    // ... more cards ...
  ];
  
  const gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
  
  // Variablen für das Spiel
  let firstGuess = '';
  let secondGuess = '';
  let count = 0;
  let previousTarget: HTMLElement | null = null;
  let delay = 1200;
  
  // DOM-Elemente auswählen
  const grid = document.querySelector('.memory-game')!;
  const score = document.querySelector('#score')!;
  
  // Funktionen für das Spiel
  function createBoard() {
    gameGrid.forEach((card, index) => {
      const memoryCard = document.createElement('div');
      memoryCard.classList.add('memory-card');
      memoryCard.dataset.framework = card.name;
  
      const frontFace = document.createElement('img');
      frontFace.classList.add('front-face');
      frontFace.src = card.img;
      frontFace.alt = card.name;
  
      const backFace = document.createElement('img');
      backFace.classList.add('back-face');
      backFace.src = 'images/card-back.png';
      backFace.alt = 'Memory Card Back';
  
      memoryCard.appendChild(frontFace);
      memoryCard.appendChild(backFace);
      grid.appendChild(memoryCard);
    });
  }
  
  function match() {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
      card.classList.add('match');
    });  
}