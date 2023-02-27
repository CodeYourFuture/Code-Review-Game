import { LitElement, html } from 'lit';

class CodeCard extends LitElement {
  static get properties() {
    return {
      text: { type: String },
      category: { type: String },
      cardId: { type: Number },
    };
  }

  render() {
    return html`
      <section
        class="card card--code"
        id="id__${this.cardId}"
        data-id="{cardId}"
      >
        <h3 class="card__title">Comment</h3>
        <p class="card__text">{text}</p>
        <h4 class="card__category">{category}</h4>
      </section>
    `;
  }
}

customElements.define('code-card', CodeCard);
