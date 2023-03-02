// this components renders a list of cards
// cards can be removed from this array by dragging them to the discard pile
// the discard pile component will handle the logic for removing cards from the array
// the card component will handle the logic for dragging cards
// this array is an array of objects
import { LitElement, html } from 'lit';

class CardHand extends LitElement {
  static properties = {
    cards: { type: Array },
  };

  constructor() {
    super();
    this.cards = [];
  }

  render() {
    return html`
      <section class="hand" aria-label="Card Hand.">
        <ul class="hand__list">
          ${this.cards.map(
            cardData =>
              html`<li class="hand__item">
                <game-card .cardData=${cardData}></game-card>
              </li>`
          )}
        </ul>
      </section>
    `;
  }
}

customElements.define('card-hand', CardHand);
