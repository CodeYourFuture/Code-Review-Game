import { LitElement, html } from 'lit';

class CommentCard extends LitElement {
  static get properties() {
    return {
      card: { type: Object },
    };
  }

  render() {
    return html`
      <section
        class="card card--comment"
        id="id__${this.id}"
        data-id="{card.id}"
        aria-label="Card."
      >
        <h3 class="card__title">Comment card</h3>
        <p class="card__text">{card.text}</p>
        <h4 class="card__category">{card.category}</h4>
      </section>
    `;
  }
}

customElements.define('code-card', CommentCard);
