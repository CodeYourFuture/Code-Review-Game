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
      startingCode: 'HI',
      playedCards: [],
      commentHand: [],
      codeHand: [],
      role: '',
    };
  }

  async startNewRound() {
    const { commentHand, codeHand } = await startRound();
    this.gameState.role = 'commenter';
    this.gameState.commentHand = commentHand;
    this.gameState.codeHand = codeHand;
    this.gameState.playedCards.push(startingCode);
    this.gameState.round += 1;
    this.requestUpdate();
  }

  render() {
    const { round, score, playedCards, commentHand, codeHand, role } =
      this.gameState;

    return html`
      <main aria-label="Game Board.">
        <score-board .round=${round} .score=${score}></score-board>
        <discard-pile .playedCards=${playedCards}></discard-pile>
        <card-hand .cards=${commentHand} .player=${role}></card-hand>
        <card-hand .cards=${codeHand} .player=${role}></card-hand>
      </main>
    `;
  }
}

customElements.define('game-board', GameBoard);
