import Memory from './memory';
import MemoryCards from './cards';

document.addEventListener("DOMContentLoaded", () => {
  const memory = new Memory({
    selector: document.getElementById('memoryGame'),
    cards: MemoryCards.getCards()
  });

})


