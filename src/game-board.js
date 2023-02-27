import { LitElement, html } from 'lit';
import './components/card-hand.js';
import './components/comment-card.js';
import './components/discard-pile.js';
import './components/score-board.js';

import startRound from './game-logic.js';

class GameBoard extends LitElement {
  static properties = {
    gameState: { type: Object },
  };

  constructor() {
    super();
    this.gameState = {
      round: 1,
      score: 0,
      startingCode: '',
      cardsPlayed: [],
      commentCards: [],
      codeCards: [],
    };
  }

  async startNewRound() {
    const { commentCard, codeCards } = await startRound();
    this.gameState.commentCards = [commentCard];
    this.gameState.codeCards = codeCards;
    this.gameState.cardsPlayed.push(commentCard);
    // eslint-disable-next-line no-plusplus
    this.gameState.round++;
    this.requestUpdate();
  }

  render() {
    const { round, score, cardsPlayed, commentCards, codeCards } =
      this.gameState;

    return html`
      <main aria-label="Game Board.">
        <score-board .round=${round} .score=${score}></score-board>
        <discard-pile .cards=${cardsPlayed}></discard-pile>
        <card-hand .cards=${commentCards}></card-hand>
        <card-hand .cards=${codeCards}></card-hand>
      </main>
    `;
  }
}

customElements.define('game-board', GameBoard);
