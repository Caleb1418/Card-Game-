

class GameLogic {
  constructor(numCards) {
    this.numCards = numCards;
    this.cards = this.generateCards(numCards);
    this.selectedCards = [];
    this.moves = 0;
    this.roundsPlayed = 0;
    this.matches = 0;
    this.setMoves = null;
  }

  generateCards(shufflePairs = false) {
    const numPairs = 4;
    const values = Array.from({ length: numPairs }, (_, i) => i + 1); // Possible values for the matching pairs
    const pairs = [];
    for (let i = 0; i < numPairs; i++) {
      const valueIndex = Math.floor(Math.random() * values.length);
      const value = values[valueIndex];
      values.splice(valueIndex, 1);
      pairs.push(value, value);
    }

    if (shufflePairs) {
      for (let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
      }
    }

    const cards = [];
    for (let i = 0; i < numPairs * 2; i++) {
      const id = i;
      const value = pairs[i];
      cards.push({ id, value, visible: false });
    }
    return cards;
  }

  checkMatch() {
    const [firstCard, secondCard] = this.selectedCards;
    if (firstCard.value === secondCard.value) {
      firstCard.matched = true;
      secondCard.matched = true;
      firstCard.isMatched = true;
      secondCard.isMatched = true;
      this.selectedCards = [];
      this.matches++;
    } else {
      setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;
        this.selectedCards = [];
      }, 1000);
    }
    this.moves++;
    
    this.setMoves(this.moves);
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
    this.moves++;
    setMoves(this.moves);
  }
  
  
  

  isGameFinished() {
    return this.cards.every((card) => card.matched);
  }

  resetGame() {
    this.cards = this.generateCards(this.numCards, true);
    this.selectedCards = [];
    this.moves = 0;
    this.roundsPlayed++;
  }
}

export default GameLogic;
