class Modal {
    private modal: HTMLElement;
  
    constructor(node: HTMLElement) {
      this.modal = node.querySelector('.modal')!;
    }
  
    openModal(): void {
      this.modal.classList.add('modal-show');
    }
  
    closeModal(): void {
      this.modal.classList.remove('modal-show');
    }
  }
  
  export default Modal;
  