import { LitElement, html } from 'lit';
import './components/card-hand.js';
import './components/comment-card.js';
import './components/discard-pile.js';
import './components/score-board.js';
import {
  initialState,
  fetchGameData,
  startNewRound,
  playCard,
} from './game-logic.js';

class GameBoard extends LitElement {
  static properties = {
    gameState: { type: Object },
    loading: { type: Boolean },
  };

  constructor() {
    super();
    this.gameState = { ...initialState };
  }

  connectedCallback() {
    super.connectedCallback();
    //get the cards from the server
    if (!this.gameState.codeHand.length || !this.gameState.commentHand.length) {
      fetchGameData();
    }
  }

  async handleStartNewRound(gameState) {
    console.log('gameState before startNewRound:', gameState);
    startNewRound(this.gameState);
    this.requestUpdate();
  }

  async handlePlayCard(hand, cardIndex) {
    await playCard(hand, cardIndex, this.gameState);
    this.requestUpdate();
  }

  render() {
    const {
      round = 1,
      score = 0,
      playedCards = [],
      commentHand = [],
      codeHand = [],
      role = '',
    } = this.gameState || {};

    return html`
      <main aria-label="Game Board.">
        <score-board .round=${round} .score=${score}></score-board>
        <discard-pile .playedCards=${playedCards}></discard-pile>
        <card-hand
          .cards=${commentHand}
          .player=${role}
          @play-card=${event =>
            this.handlePlayCard('commentHand', event.detail.cardIndex)}
        ></card-hand>
        <card-hand
          .cards=${codeHand}
          .player=${role}
          @play-card=${event =>
            this.handlePlayCard('codeHand', event.detail.cardIndex)}
        ></card-hand>
        <button @click=${() => this.handleStartNewRound()}>
          Start New Round
        </button>
      </main>
    `;
  }
}

customElements.define('game-board', GameBoard);
