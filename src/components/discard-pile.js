import { LitElement, html } from 'lit';

export class DiscardPile extends LitElement {
  static get properties() {
    return {
      playedCards: { type: Array },
    };
  }

  constructor() {
    super();
    this.playedCards = [];
  }

  render() {
    return html`
      <section class="discards" aria-label="Discard Pile">
        ${this.playedCards.map(
          card => html`<card-element .card=${card}></card-element>`
        )}
      </section>
    `;
  }
}

customElements.define('discard-pile', DiscardPile);
