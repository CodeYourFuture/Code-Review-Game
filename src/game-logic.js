// Initialise state
const initialState = {
  round: 1,
  score: 0,
  startingCode: '',
  playedCards: [],
  commentHand: [],
  codeHand: [],
  commentCards: [],
  codeCards: [],
  remainingCommentHand: [],
  remainingCodeHand: [],
  role: 'coder',
  updatedComment: '',
  updatedCode: '',
};

// Load the code change cards from the server async fetch
async function getChanges() {
  const response = await fetch('http://localhost:8000/changes.json');
  const data = await response.json();
  return data.codeCards;
}

// Load the comment cards from the server async fetch
async function getComments() {
  const response = await fetch('http://localhost:8000/comments.json');
  const data = await response.json();
  return data.commentCards;
}

async function fetchGameData() {
  const [codeCards, commentCards] = await Promise.all([
    getChanges(),
    getComments(),
  ]);
  return { codeCards, commentCards };
}

function startNewRound({ gameState }) {
  const { round, playedCards } = gameState;
  const newRound = round + 1;
  const newGameState = {
    ...initialState,
    round: newRound,
    startingCode: playedCards[playedCards.length - 1],
  };

  return dealCards(newGameState);
}

// Deal cards to each player
function dealCards(gameState) {
  const { commentHand, codeHand, round, startingCode } = gameState;
  const commentCards = shuffleCards(
    commentHand.splice(0, getCardsPerRound(round))
  );
  const codeCards = shuffleCards(codeHand.splice(0, getCardsPerRound(round)));

  return {
    commentCards,
    codeCards,
    playedCards: [startingCode],
  };
}

// Play a card and update the game state
function playCard(cardIndex, hand, gameState, updateGameState) {
  const playedCard = hand[cardIndex];
  const remainingHand = hand.filter((_, index) => index !== cardIndex);
  const playedCards = [...gameState.playedCards, playedCard];
  const newGameState = {
    ...gameState,
    playedCards,
    [hand === gameState.codeHand ? 'updatedCode' : 'updatedComment']:
      playedCard,
    [hand === gameState.codeHand ? 'role' : '']:
      hand === gameState.codeHand ? 'commenter' : '',
    [hand === gameState.commentHand ? 'score' : '']:
      hand === gameState.commentHand ? gameState.score + 1 : gameState.score,
    [hand === gameState.commentHand ? 'role' : '']:
      hand === gameState.commentHand ? 'coder' : '',
    [hand === gameState.commentHand ? 'codeCards' : 'commentCards']:
      hand === gameState.commentHand
        ? gameState.codeCards
        : gameState.commentCards,
    remainingCommentHand:
      hand === gameState.commentHand
        ? remainingHand
        : gameState.remainingCommentHand,
    remainingCodeHand:
      hand === gameState.codeHand ? remainingHand : gameState.remainingCodeHand,
  };
  updateGameState(newGameState);
}

// Shuffle the cards
function shuffleCards(cards) {
  return cards.sort(() => Math.random() - 0.5);
}

// Get the number of cards to deal per round
function getCardsPerRound(round) {
  return round * 2 + 1;
}

export { initialState, fetchGameData, dealCards, playCard, startNewRound };
