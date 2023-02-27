import { LitElement, html } from 'lit';

class CardHand extends LitElement {
  static get properties() {
    return {
      cards: { type: Array },
      player: { type: String },
    };
  }

  render() {
    return html`
      <ul class="hand">
        ${this.cards.map(
          (card, index) => html`
            <li class="hand__card" data-index=${index}>
              ${this.player === 'commenter'
                ? html`<comment-card .card=${card}></comment-card>`
                : html`<code-card .card=${card}></code-card>`}
            </li>
          `
        )}
      </ul>
    `;
  }
}

customElements.define('card-hand', CardHand);
