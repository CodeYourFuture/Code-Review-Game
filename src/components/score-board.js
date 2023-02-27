import { LitElement, html } from 'lit';

class ScoreBoard extends LitElement {
  static get properties() {
    return {
      round: { type: Number },
      score: { type: Number },
    };
  }

  render() {
    return html`
      <section class="score-board">
        <h2 class="score-board__title">Score Board</h2>
        <p class="score-board__score">Score: ${this.score}</p>
        <p class="score-board__round">Round: ${this.round}</p>
      </section>
    `;
  }
}

customElements.define('score-board', ScoreBoard);
