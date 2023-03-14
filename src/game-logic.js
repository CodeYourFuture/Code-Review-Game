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

async function getChanges() {
  const response = await fetch('http://localhost:8000/changes.json');
  const data = await response.json();
  return data.codeCards;
}

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

function playCard(cardIndex, hand, gameState, updateGameState) {
  const playedCard = hand[cardIndex];
  const remainingHand = hand.filter((_, index) => index !== cardIndex);
  const playedCards = [...gameState.playedCards, playedCard];

  const isCodeHand = hand === gameState.codeHand;

  const newGameState = {
    ...gameState,
    playedCards,
    updatedCode: isCodeHand ? playedCard : gameState.updatedCode,
    updatedComment: !isCodeHand ? playedCard : gameState.updatedComment,
    role: isCodeHand ? 'commenter' : 'coder',
    score: !isCodeHand ? gameState.score + 1 : gameState.score,
    codeCards: gameState.codeCards,
    commentCards: gameState.commentCards,
    remainingCommentHand: !isCodeHand
      ? remainingHand
      : gameState.remainingCommentHand,
    remainingCodeHand: isCodeHand ? remainingHand : gameState.remainingCodeHand,
  };

  updateGameState(newGameState);
}

function shuffleCards(cards) {
  return cards.sort(() => Math.random() - 0.5);
}

function getCardsPerRound(round) {
  return round * 2 + 1;
}

export { initialState, fetchGameData, dealCards, playCard, startNewRound };
