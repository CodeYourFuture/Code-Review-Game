import { LitElement, html } from 'lit';

class GameCard extends LitElement {
  static properties = {
    cardData: { type: Object },
    playerRole: { type: String },
  };

  constructor() {
    super();
    this.cardData = {};
    this.playerRole = '';
  }

  handleDragStart(event) {
    event.dataTransfer.setData('text/plain', this.cardData.id);
    event.dataTransfer.effectAllowed = 'move';
  }

  render() {
    return html`
      <div class="card" draggable="true" @dragstart=${this.handleDragStart}>
        ${this.playerRole === 'commenter'
          ? html`<comment-card .card=${this.cardData}></comment-card>`
          : html`<code-card .card=${this.cardData}></code-card>`}
      </div>
    `;
  }
}

customElements.define('game-card', GameCard);
