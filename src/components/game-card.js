import { LitElement, html } from 'lit';
// this card wrapper can render either a code card or a comment card
// depending on the player's role
// all the shared functions of a playable card are defined here
class Card extends LitElement {
  static properties = {
    cardData: { type: Object },
    playerRole: { type: String },
  };

  constructor() {
    super();
    this.cardData = {};
  }

  handleDragStart(event) {
    event.dataTransfer.setData('text/plain', this.cardData.id);
    event.dataTransfer.effectAllowed = 'move';
  }

  render() {
    return html`
      <div class="card" draggable="true" @dragstart=${this.handleDragStart}>
        ${this.playerRole === 'commenter'
          ? html`<comment-card .card=${card}></comment-card>`
          : html`<code-card .card=${card}></code-card>`}
      </div>
    `;
  }
}
