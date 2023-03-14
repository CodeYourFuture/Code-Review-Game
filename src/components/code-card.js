import { LitElement, html } from 'lit';

class CodeCard extends LitElement {
  static get properties() {
    return {
      card: { type: Object },
      onLintCode: { type: Function },
      onImproveNames: { type: Function },
      onAddComments: { type: Function },
      onAddTests: { type: Function },
      onChangeCode: { type: Function },
    };
  }

  render() {
    return html`
      <section
        class="card card--code"
        id="id__${this.card.id}"
        data-id="{card.id}"
        aria-label="Card."
      >
        <h3 class="card__title">Code change card</h3>
        <button @click=${this.onLintCode}>Lint the code</button>
        <button @click=${this.onImproveNames}>Improve variable names</button>
        <button @click=${this.onAddComments}>Add comments</button>
        <button @click=${this.onAddTests}>Add tests</button>
        <button @click=${this.onChangeCode}>Change code directly</button>
      </section>
    `;
  }
}

customElements.define('code-card', CodeCard);
