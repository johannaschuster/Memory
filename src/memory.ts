import Modal from "./modal";
class Memory {
  private node: HTMLElement;
  private cards: any;
  private clickedCards: any;
  private timeout: any | null = null;
  private cardMoves: any;
  private cardsCollected: number;
  private cardsMatch: any;
  private board: any;
  private modal: Modal;
  public playBtn: HTMLElement;
  private memoryMoves: Element;
  private memoryMatches: Element;
  cardCollectionBox!: DOMRect;
  
  constructor(opts: { selector: any, cards: any }) {
    this.node = opts.selector;
    this.cards = opts.cards.concat(opts.cards);

    this.clickedCards = [];
    this.timeout = null;

    this.cardMoves = 0;

    this.cardsCollected = 0;
    this.cardsMatch = 0;

    this.board = this.node.querySelector('.memory-board');
    this.modal = new Modal(this.node);
    this.playBtn = this.node.querySelector('.playBtn')!;
    this.memoryMoves = this.node.querySelector('#memoryMoves')!;
    this.memoryMatches = this.node.querySelector('#memoryMatches')!;
    
    this.playBtn.addEventListener('click', (e) => {
      this.closeModal();
      this.startGame();
    });
    this.startGame();
  }
  startGame(): void {
    this.reset();
    this.shuffleCards();
    this.render();
    this.updateUI();

    this.cardCollectionBox = document.getElementById('memoryMatchesCards')!.getBoundingClientRect();
    
    const cardElements = this.node.querySelectorAll<HTMLElement>('.memory-card-item');
    cardElements.forEach(cardElement => {
      cardElement.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        // prevent double click
        if (!e.detail || e.detail === 1) {
          this.cardClicked(e);
        }
      });
    }); 
  }


  cardClicked(e: MouseEvent) {
    const clickedCard = e.currentTarget as HTMLElement;
    if (clickedCard.classList.contains('solved') || clickedCard.classList.contains('visible')) {
      return false;
    }
    if (this.clickedCards.length >= 2) {
      return false;
    }
    if (this.clickedCards.length <= 1) {
      clickedCard.classList.toggle('visible');
      this.clickedCards.push(clickedCard);
      if (this.clickedCards.length < 2) {
        return false;
      }
    }
    if (this.matchCards(this.clickedCards[0].getAttribute('data-card'), this.clickedCards[1].getAttribute('data-card'))) {
      this.cardsCollected += 2;
      this.cardsMatch++;

      setTimeout(() => {
        this.moveSlide('#match');
      }, 500);
      setTimeout(() => {
        this.clickedCards.forEach((card: { classList: { add: (arg0: string) => void; }; }) => {
          card.classList.add('solved');
          this.collectCard(card);
        });
        this.clickedCards = [];
        this.checkGameEnd();
      }, 1500);
    }
    else {
      setTimeout(() => {
        this.clickedCards.forEach((card: { classList: { add: (arg0: string) => void; }; }) => {
          card.classList.add('visible');
        });
        this.moveSlide('#noMatch');
      }, 300);
      if (this.timeout !== null) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.clickedCards.forEach((card: { classList: { remove: (arg0: string) => void; }; }) => {
          card.classList.remove('visible');
          card.classList.remove('no-match');
        });
        this.clickedCards = [];
      }, 1000);
    }
    this.cardMoves++;
    this.updateUI();
  }

  reset() {
    this.cardMoves = 0;
    this.cardsCollected = 0;
    this.cardsMatch = 0;
  }

  
  matchCards(a: object, b: object) {
    return a === b;
  }

  collectCard(card: any) {
    const cardBox = card.getBoundingClientRect();
    const cardPosX = window.scrollX + cardBox.left;
    const cardPosY = window.scrollY + cardBox.top;

    let moveItemA = document.createElement('div');
    moveItemA.className = 'move-item';
    moveItemA.style.width = cardBox.width + 'px';
    moveItemA.style.height = cardBox.height + 'px';
    moveItemA.style.left = `${cardPosX}px`;
    moveItemA.style.top = `${cardPosY}px`;
    moveItemA.appendChild(card.querySelector('img').cloneNode());
    document.body.appendChild(moveItemA);

    setTimeout(() => {
      moveItemA.style.left = `${window.scrollX + this.cardCollectionBox.left}px`;
      moveItemA.style.top = `${window.scrollY + this.cardCollectionBox.top}px`;
      moveItemA.style.opacity = '0.0';
      moveItemA.style.scale = '0.5';
    }, 50);
  }

  
  shuffleCards() {
    this.cards.sort(() => Math.random() - 0.5);
  }

   
  render() {
    this.board.innerHTML = '';
    this.cards.forEach((card: { id: number; img: object; }, i: number) => {
      this.board.innerHTML += this.renderCard(card, i);
    });
  }

  renderCard(card: { id: number; img: object; }, i: number): string {
    return `
        <div class="memory-card-item" data-card="${card.id}">
            <div class="memory-card-item-inner">
                <div class="memory-card-item-front"></div>
                <div class="memory-card-item-back">
                 <img src="../${card.img}" />
                </div>
            </div>
        </div>
    `;
  }

  updateUI() {
    this.memoryMoves.innerHTML = this.cardMoves;
    this.memoryMatches.innerHTML = this.cardsMatch;
  }

  checkGameEnd(): void {
    if (this.cards.length === this.cardsCollected) {
      this.openModal('#modal-finish');
    }
  }
  moveSlide(slideId: string) {
    let moveSlide = this.node.querySelector(slideId);
    moveSlide!.classList.add('show');
    setTimeout(() => {
      moveSlide!.classList.remove('show');
    }, 1000);
  }
  
  openModal(arg0: string) {
    this.modal.openModal();
  }
  closeModal(this: any) {
    this.modal.closeModal();
    }   
} 
export default Memory;