import { elements } from "../node_modules/chart.js/dist/index";

class Memory {

  private node: Element;
  private cards: string[];
  private clickedCards: any;
  private timeout: number | null;
  private cardMoves: number;
  private cardsCollected: number;
  private cardsMatch: number;
  private board?: Element;
  private modal?: Element;
  private playBtn?: Element;
  private memoryMoves?: Element;
  private memoryMatches?: Element;
  cardCollectionBox!: DOMRect;
  matchCards: any;

  constructor(opts: {selector: any, cards: string[]}) {
    this.node = opts.selector;
    this.cards = opts.cards.concat(opts.cards);

    this.clickedCards = [];
    this.timeout = null;

    this.cardMoves = 0;
    this.cardsCollected = 0;
    this.cardsMatch = 0;

    this.board = this.node.querySelector('.memory-board')!;
    this.modal = this.node.querySelector('.modal')!;
    this.playBtn = this.node.querySelector('.playBtn')!;
    this.memoryMoves = this.node.querySelector('#memoryMoves')!;
    this.memoryMatches = this.node.querySelector('#memoryMatches')!;

    this.playBtn.addEventListener('click', (e)=>{
      this.closeModal();
      this.startGame();
    })
    this.startGame();

  }
  closeModal() {
    throw new Error("Method not implemented.");
  }
  private startGame(): void {
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
  reset() {
    throw new Error("Method not implemented.");
  }
  shuffleCards() {
    throw new Error("Method not implemented.");
  }
  render() {
    throw new Error("Method not implemented.");
  }
  updateUI() {
    throw new Error("Method not implemented.");
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

    if (this.matchCards(this.clickedCards[0].getAttribute('data-card'), this.clickedCards[1].getAttribute('data-card'))){
      this.cardsCollected += 2;
      this.cardsMatch++;

   
  }
  }}

  