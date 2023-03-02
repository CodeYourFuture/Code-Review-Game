import { LitElement, html } from 'lit';
import { playCard } from '../game-logic.js';

class DiscardPile extends LitElement {
  static properties = {
    playedCards: { type: Array },
  };

  constructor() {
    super();
    this.playedCards = [];
  }

  handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  handleDrop(event) {
    const cardId = event.dataTransfer.getData('text/plain');
    event.preventDefault();
    playCard(cardId);
  }

  render() {
    return html`
      <section
        class="discards"
        aria-label="Discard Pile."
        @dragover=${this.handleDragOver}
        @drop=${this.handleDrop}
      >
        ${this.playedCards.map(
          cardData => html`<game-card .cardData=${cardData}></game-card>`
        )}
      </section>
    `;
  }
}

customElements.define('discard-pile', DiscardPile);
