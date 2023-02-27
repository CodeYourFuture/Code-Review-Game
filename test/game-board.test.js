import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/game-board.js';

describe('GameBoard', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<game-board></game-board>`);
  });

  it('renders a board labelled Game Board.', () => {
    const board = element.shadowRoot.querySelector('game-board');
    expect(board).to.exist;
    expect(board.ariaLabel).to.equal('Game Board.');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
