class GameLogic {
  constructor(numCards) {
    this.numCards = numCards;
    this.cards = this.generateCards(numCards);
    this.selectedCards = [];
    this.moves = 0;
    this.roundsPlayed = 0;
  }

  generateCards() {
    const numPairs = 4; // Number of matching pairs
    const values = Array.from({ length: numPairs }, (_, i) => i + 1); // Possible values for the matching pairs
    const pairs = [];
    for (let i = 0; i < numPairs; i++) {
      const valueIndex = Math.floor(Math.random() * values.length);
      const value = values[valueIndex];
      values.splice(valueIndex, 1);
      pairs.push(value, value);
    }
    const cards = [];
    for (let i = 0; i < numPairs * 2; i++) {
      const id = i;
      const valueIndex = Math.floor(Math.random() * pairs.length);
      const value = pairs[valueIndex];
      pairs.splice(valueIndex, 1);
      cards.push({ id, value, visible: false });
    }
    return cards;
  }

  checkMatch() {
    this.moves++;
    const [firstCard, secondCard] = this.selectedCards;
    if (firstCard.value === secondCard.value) {
      firstCard.matched = true;
      secondCard.matched = true;
      this.selectedCards = [];
      return true;
    } else {
      setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;
        this.selectedCards = [];
      }, 1000);
      return false;
    }
  }

  handleCardPress(id) {
    const card = this.cards.find((card) => card.id === id);
    if (card.flipped || card.matched) {
      return;
    }
    card.flipped = true;
    this.selectedCards.push(card);
    if (this.selectedCards.length === 2) {
      this.checkMatch();
    }
  }

  isGameFinished() {
    return this.cards.every((card) => card.matched);
  }

  resetGame() {
    this.cards = this.generateCards(this.numCards);
    this.selectedCards = [];
    this.moves = 0;
    this.roundsPlayed++;
  }
}

export default GameLogic;