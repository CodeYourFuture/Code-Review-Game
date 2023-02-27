// All the mechanics of the game are handled here
// to use any of these functions import them into the component at the top of the file
const GameLogic = {
  // Initialize the game
  initializeGame() {
    // Load the starting code from the server
    fetch('/changes')
      .then(response => response.json())
      .then(data => {
        this.startingCode = data;
      })
      .catch(error => error);

    // Load the comment cards for Alf from the server and log errors without console
    fetch('/comments')
      .then(response => response.json())
      .then(data => {
        this.commentCards = data;
      })
      .catch(error => error);

    // Load the code change cards for Betty from the server and log errors without console
    fetch('/changes')
      .then(response => response.json())
      .then(data => {
        this.codeChangeCards = data;
      })
      .catch(error => error);
  },

  // Start a new round
  startRound() {
    // Shuffle an array of cards
    const shuffleCards = cards => cards.sort(() => Math.random() - 0.5);
    // Get the number of cards each player gets in a round
    const getCardsPerRound = () => this.state.round * 2 + 1;
    // Deal cards to each player
    this.commenterHand = shuffleCards(
      this.commentCards.splice(0, getCardsPerRound())
    );
    this.coderHand = shuffleCards(
      this.codeChangeCards.splice(0, getCardsPerRound())
    );
  },
  playCard(cardIndex, hand, state) {
    const play = state.hand[cardIndex];
    const remainingHand = state.hand.filter(
      (card, index) => index !== cardIndex
    );
    const playedCards = [...state.playedCards, play];
    this.updateState({
      startingCode: this.updatedCode,
      playedCards,
      remainingHand,
    });
  },

  // Approve the code changes and end the round
  approveCodeChanges() {
    // implementation
  },

  // Calculate the team's score for the current round
  calculateScore() {
    // implementation
  },

  // Reset the game state
  resetGame() {
    // implementation
  },
};

export default GameLogic;
